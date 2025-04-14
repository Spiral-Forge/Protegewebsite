#!/bin/bash

# Create directories for optimized images
mkdir -p images/optimized/jpg
mkdir -p images/optimized/jpg/Social\ Media\ Team
mkdir -p images/optimized/jpg/Cohort\ Team
mkdir -p images/optimized/jpg/Research\ Team

# Check if sips is available (should be pre-installed on macOS)
if ! command -v sips &> /dev/null; then
    echo "sips command not found. This script requires macOS."
    exit 1
fi

echo "Using sips for image processing (macOS built-in tool)"

# Function to optimize team member images
optimize_team_image() {
    local input_file="$1"
    local filename=$(basename "$input_file")
    local filename_noext="${filename%.*}"
    local dirname=$(dirname "$input_file")
    local dirname_clean=$(echo "$dirname" | sed 's|^images/||')
    
    # Create output directory if it doesn't exist
    mkdir -p "images/optimized/jpg/$dirname_clean"
    
    # Output path
    local output_jpg="images/optimized/jpg/$dirname_clean/${filename_noext}.jpg"
    
    echo "Processing: $input_file"
    
    # Resize and optimize JPG (300x300 for team members)
    sips -s format jpeg -Z 300 "$input_file" --out "$output_jpg"
    
    echo "Created: $output_jpg"
}

# Function to optimize event images
optimize_event_image() {
    local input_file="$1"
    local filename=$(basename "$input_file")
    local filename_noext="${filename%.*}" 
    local filename_clean=$(echo "$filename_noext" | tr -d "'")
    
    echo "Processing event image: $input_file"
    
    # Resize to 800px width max for event images
    sips -s format jpeg -Z 800 "$input_file" --out "images/optimized/jpg/${filename_clean}.jpg"
    
    echo "Created: images/optimized/jpg/${filename_clean}.jpg"
}

# Process team member images
echo "Optimizing team member images..."
find images -type f \( -name "*.jpg" -o -name "*.png" \) | while read -r img; do
    optimize_team_image "$img"
done

# Process event images
echo "Optimizing event images..."
for img in "SpringCode'25.png" "ResumeRevamp2.0.png" "DevSprint'21.png" "CodeSolstice'23.png" "Mentober'2020.png" "PrepPro Coding Challenge.png"; do
    if [ -f "$img" ]; then
        optimize_event_image "$img"
    else
        echo "Warning: Event image $img not found"
    fi
done

# Process hero image
echo "Optimizing hero image..."
if [ -f "mentor-image.png" ]; then
    # Use sips (macOS built-in tool)
    sips -s format jpeg -Z 600 "mentor-image.png" --out "mentor-image.jpg"
    echo "Created: mentor-image.jpg"
else
    echo "Warning: Hero image mentor-image.png not found"
fi

echo "Image optimization complete!"
echo "Your optimized images are in the images/optimized/jpg/ directory"
echo "Note: You will need to update your HTML to use .jpg instead of .webp for source files"
