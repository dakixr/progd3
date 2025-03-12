#!/usr/bin/env node

/**
 * Job Manager Script
 * 
 * This script provides utilities for managing job listings in the programita d3 job portal.
 * It allows adding, editing, and removing job listings from the data file.
 * 
 * Usage:
 *   node job-manager.js add    - Add a new job listing
 *   node job-manager.js edit   - Edit an existing job listing
 *   node job-manager.js remove - Remove a job listing
 *   node job-manager.js list   - List all job listings
 */

import fs from 'fs';
import path from 'path';
import readline from 'readline';
import { fileURLToPath } from 'url';

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const jobsFilePath = path.join(__dirname, '../data/jobs.ts');

// Helper function to read the jobs file
function readJobsFile() {
  try {
    const fileContent = fs.readFileSync(jobsFilePath, 'utf8');
    // Extract the jobs array from the file content using regex
    const jobsMatch = fileContent.match(/export const jobs: Job\[] = (\[[\s\S]*?\]);/);
    if (!jobsMatch || !jobsMatch[1]) {
      console.error('Could not parse jobs array from file');
      process.exit(1);
    }
    
    // Use Function constructor to evaluate the string safely
    // This is safer than eval but still should be used with caution
    const jobsArray = new Function(`return ${jobsMatch[1]}`)();
    return jobsArray;
  } catch (error) {
    console.error('Error reading jobs file:', error);
    process.exit(1);
  }
}

// Helper function to write jobs back to the file
function writeJobsFile(jobs) {
  try {
    // Read the original file to preserve the interface definition
    const originalContent = fs.readFileSync(jobsFilePath, 'utf8');
    const interfaceMatch = originalContent.match(/(export interface Job[\s\S]*?}\n\n)/);
    
    if (!interfaceMatch) {
      console.error('Could not find Job interface in file');
      process.exit(1);
    }
    
    // Format the jobs array as a string
    const jobsString = JSON.stringify(jobs, null, 2)
      .replace(/"([^"]+)":/g, '$1:') // Convert "key": to key:
      .replace(/"/g, "'"); // Replace double quotes with single quotes
    
    // Create the new file content
    const newContent = `${interfaceMatch[0]}// Sample job listings
export const jobs: Job[] = ${jobsString};`;
    
    fs.writeFileSync(jobsFilePath, newContent, 'utf8');
    console.log('Jobs file updated successfully');
  } catch (error) {
    console.error('Error writing jobs file:', error);
    process.exit(1);
  }
}

// Function to add a new job
function addJob() {
  const newJob = {
    id: '',
    title: '',
    department: '',
    location: '',
    type: '',
    workMode: '',
    postedDate: new Date().toISOString().split('T')[0],
    description: '',
    requirements: [],
    responsibilities: [],
    benefits: []
  };
  
  console.log('Adding a new job listing:');
  
  rl.question('ID (URL-friendly): ', (id) => {
    newJob.id = id;
    
    rl.question('Title: ', (title) => {
      newJob.title = title;
      
      console.log('\nDepartment options:');
      console.log('1. engineering');
      console.log('2. design');
      console.log('3. marketing');
      console.log('4. product');
      console.log('5. other');
      
      rl.question('Department (enter number): ', (deptNum) => {
        const departments = ['engineering', 'design', 'marketing', 'product', 'other'];
        newJob.department = departments[parseInt(deptNum) - 1] || 'other';
        
        rl.question('Location (e.g., Madrid, Barcelona, Remote): ', (location) => {
          newJob.location = location;
          
          console.log('\nType options:');
          console.log('1. full_time');
          console.log('2. part_time');
          
          rl.question('Type (enter number): ', (typeNum) => {
            const types = ['full_time', 'part_time'];
            newJob.type = types[parseInt(typeNum) - 1] || 'full_time';
            
            console.log('\nWork mode options:');
            console.log('1. remote');
            console.log('2. hybrid');
            console.log('3. onsite');
            
            rl.question('Work mode (enter number): ', (modeNum) => {
              const modes = ['remote', 'hybrid', 'onsite'];
              newJob.workMode = modes[parseInt(modeNum) - 1] || 'hybrid';
              
              rl.question('Description: ', (description) => {
                newJob.description = description;
                
                console.log('\nEnter requirements (one per line, empty line to finish):');
                const requirements = [];
                
                function getRequirements() {
                  rl.question('Requirement: ', (req) => {
                    if (req.trim() === '') {
                      console.log('\nEnter responsibilities (one per line, empty line to finish):');
                      const responsibilities = [];
                      
                      function getResponsibilities() {
                        rl.question('Responsibility: ', (resp) => {
                          if (resp.trim() === '') {
                            console.log('\nEnter benefits (one per line, empty line to finish):');
                            const benefits = [];
                            
                            function getBenefits() {
                              rl.question('Benefit: ', (benefit) => {
                                if (benefit.trim() === '') {
                                  newJob.requirements = requirements;
                                  newJob.responsibilities = responsibilities;
                                  newJob.benefits = benefits;
                                  
                                  // Add the new job to the jobs array
                                  const jobs = readJobsFile();
                                  jobs.push(newJob);
                                  writeJobsFile(jobs);
                                  
                                  console.log('\nNew job added successfully!');
                                  rl.close();
                                } else {
                                  benefits.push(benefit);
                                  getBenefits();
                                }
                              });
                            }
                            
                            getBenefits();
                          } else {
                            responsibilities.push(resp);
                            getResponsibilities();
                          }
                        });
                      }
                      
                      getResponsibilities();
                    } else {
                      requirements.push(req);
                      getRequirements();
                    }
                  });
                }
                
                getRequirements();
              });
            });
          });
        });
      });
    });
  });
}

// Function to list all jobs
function listJobs() {
  const jobs = readJobsFile();
  
  console.log('\nCurrent job listings:');
  console.log('---------------------');
  
  jobs.forEach((job, index) => {
    console.log(`${index + 1}. ${job.title} (${job.id})`);
    console.log(`   Department: ${job.department}`);
    console.log(`   Location: ${job.location}`);
    console.log(`   Posted: ${job.postedDate}`);
    console.log('');
  });
  
  rl.close();
}

// Function to remove a job
function removeJob() {
  const jobs = readJobsFile();
  
  console.log('\nCurrent job listings:');
  console.log('---------------------');
  
  jobs.forEach((job, index) => {
    console.log(`${index + 1}. ${job.title} (${job.id})`);
  });
  
  rl.question('\nEnter the number of the job to remove: ', (num) => {
    const index = parseInt(num) - 1;
    
    if (isNaN(index) || index < 0 || index >= jobs.length) {
      console.error('Invalid job number');
      rl.close();
      return;
    }
    
    const removedJob = jobs.splice(index, 1)[0];
    writeJobsFile(jobs);
    
    console.log(`\nRemoved job: ${removedJob.title}`);
    rl.close();
  });
}

// Function to edit a job
function editJob() {
  const jobs = readJobsFile();
  
  console.log('\nCurrent job listings:');
  console.log('---------------------');
  
  jobs.forEach((job, index) => {
    console.log(`${index + 1}. ${job.title} (${job.id})`);
  });
  
  rl.question('\nEnter the number of the job to edit: ', (num) => {
    const index = parseInt(num) - 1;
    
    if (isNaN(index) || index < 0 || index >= jobs.length) {
      console.error('Invalid job number');
      rl.close();
      return;
    }
    
    const job = jobs[index];
    
    console.log('\nEditing job:', job.title);
    console.log('Leave fields empty to keep current values');
    
    rl.question(`Title [${job.title}]: `, (title) => {
      if (title.trim() !== '') job.title = title;
      
      rl.question(`Description [${job.description.substring(0, 30)}...]: `, (description) => {
        if (description.trim() !== '') job.description = description;
        
        console.log('\nDepartment options:');
        console.log(`1. engineering ${job.department === 'engineering' ? '(current)' : ''}`);
        console.log(`2. design ${job.department === 'design' ? '(current)' : ''}`);
        console.log(`3. marketing ${job.department === 'marketing' ? '(current)' : ''}`);
        console.log(`4. product ${job.department === 'product' ? '(current)' : ''}`);
        console.log(`5. other ${job.department === 'other' ? '(current)' : ''}`);
        
        rl.question('Department (enter number or leave empty): ', (deptNum) => {
          if (deptNum.trim() !== '') {
            const departments = ['engineering', 'design', 'marketing', 'product', 'other'];
            job.department = departments[parseInt(deptNum) - 1] || job.department;
          }
          
          rl.question(`Location [${job.location}]: `, (location) => {
            if (location.trim() !== '') job.location = location;
            
            console.log('\nType options:');
            console.log(`1. full_time ${job.type === 'full_time' ? '(current)' : ''}`);
            console.log(`2. part_time ${job.type === 'part_time' ? '(current)' : ''}`);
            
            rl.question('Type (enter number or leave empty): ', (typeNum) => {
              if (typeNum.trim() !== '') {
                const types = ['full_time', 'part_time'];
                job.type = types[parseInt(typeNum) - 1] || job.type;
              }
              
              console.log('\nWork mode options:');
              console.log(`1. remote ${job.workMode === 'remote' ? '(current)' : ''}`);
              console.log(`2. hybrid ${job.workMode === 'hybrid' ? '(current)' : ''}`);
              console.log(`3. onsite ${job.workMode === 'onsite' ? '(current)' : ''}`);
              
              rl.question('Work mode (enter number or leave empty): ', (modeNum) => {
                if (modeNum.trim() !== '') {
                  const modes = ['remote', 'hybrid', 'onsite'];
                  job.workMode = modes[parseInt(modeNum) - 1] || job.workMode;
                }
                
                rl.question(`Posted date [${job.postedDate}]: `, (postedDate) => {
                  if (postedDate.trim() !== '') job.postedDate = postedDate;
                  
                  // Update the job in the jobs array
                  jobs[index] = job;
                  writeJobsFile(jobs);
                  
                  console.log('\nJob updated successfully!');
                  rl.close();
                });
              });
            });
          });
        });
      });
    });
  });
}

// Main function
function main() {
  const command = process.argv[2];
  
  if (!command) {
    console.log('Usage:');
    console.log('  node job-manager.js add    - Add a new job listing');
    console.log('  node job-manager.js edit   - Edit an existing job listing');
    console.log('  node job-manager.js remove - Remove a job listing');
    console.log('  node job-manager.js list   - List all job listings');
    rl.close();
    return;
  }
  
  switch (command.toLowerCase()) {
    case 'add':
      addJob();
      break;
    case 'edit':
      editJob();
      break;
    case 'remove':
      removeJob();
      break;
    case 'list':
      listJobs();
      break;
    default:
      console.error('Unknown command:', command);
      rl.close();
  }
}

main(); 