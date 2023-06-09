#!/bin/bash

# Loop over each jpg file in the current directory
for file in *.png
do
  # Get the file name without the .jpg extension
  base_name=$(basename "$file" .jpg)
  
  # Convert the file to webp
  cwebp "$file" -o "$base_name.webp"
done