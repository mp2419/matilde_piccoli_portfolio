from moviepy.editor import VideoFileClip
import os

def convert_mov_to_mp4(input_path, output_path=None):
    """Convert a .mov video file to .mp4 using moviepy."""
    
    if not os.path.exists(input_path):
        raise FileNotFoundError(f"Input file not found: {input_path}")

    # Set output filename if not provided
    if output_path is None:
        base, _ = os.path.splitext(input_path)
        output_path = base + ".mp4"

    print(f"Converting {input_path} → {output_path} ...")
    
    # Load and write with H.264 encoding (standard for web)
    clip = VideoFileClip(input_path)
    clip.write_videofile(output_path, codec="libx264", audio_codec="aac")

    print("✅ Conversion complete!")
    clip.close()

# Example usage:
if __name__ == "__main__":
    convert_mov_to_mp4("assets/vid/uccello_low.mov")
