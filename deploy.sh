#!/bin/bash

astro build

aws s3 sync dist/ s3://progd3.es