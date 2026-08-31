import os
import requests
from io import BytesIO
from PIL import Image, ImageDraw, ImageFont, ImageFilter

OUTPUT_DIR = "public/images"
os.makedirs(OUTPUT_DIR, exist_ok=True)

# High-quality Unsplash image IDs (business, luxury, modern, tech)
IMAGE_IDS = [
    "1542744173-8e7e53415bb0" # 6th image
]

TARGET_WIDTH = 1920
TARGET_HEIGHT = 820

# We use segoeui.ttf which is standard on Windows
try:
    font_title = ImageFont.truetype("C:\\Windows\\Fonts\\segoeui.ttf", 90)
    font_subtitle = ImageFont.truetype("C:\\Windows\\Fonts\\segoeui.ttf", 40)
    font_button = ImageFont.truetype("C:\\Windows\\Fonts\\segoeuib.ttf", 35) # bold
except:
    font_title = font_subtitle = font_button = ImageFont.load_default()

def draw_text_centered(draw, text, font, y, color=(255, 255, 255)):
    # get text size
    bbox = font.getbbox(text)
    w = bbox[2] - bbox[0]
    x = (TARGET_WIDTH - w) / 2
    draw.text((x, y), text, font=font, fill=color)

def generate_banner(index, image_id):
    print(f"Generating banner {index+1}...")
    url = f"https://images.unsplash.com/photo-{image_id}?w=1920&q=80&fit=crop"
    
    # Download image
    response = requests.get(url)
    if response.status_code != 200:
        print(f"Failed to download image {image_id}")
        return
        
    img = Image.open(BytesIO(response.content)).convert("RGBA")
    
    # Resize and crop to 1920x820 exactly
    # First resize so the smallest dimension matches the target
    ratio_w = TARGET_WIDTH / img.width
    ratio_h = TARGET_HEIGHT / img.height
    ratio = max(ratio_w, ratio_h)
    
    new_w = int(img.width * ratio)
    new_h = int(img.height * ratio)
    img = img.resize((new_w, new_h), Image.Resampling.LANCZOS)
    
    # Crop center
    left = (new_w - TARGET_WIDTH) / 2
    top = (new_h - TARGET_HEIGHT) / 2
    img = img.crop((left, top, left + TARGET_WIDTH, top + TARGET_HEIGHT))
    
    # Darken and blur slightly for legibility
    img = img.filter(ImageFilter.GaussianBlur(radius=2))
    
    # Create dark overlay
    overlay = Image.new("RGBA", img.size, (0, 0, 0, 160))
    img = Image.alpha_composite(img, overlay)
    
    # Draw text
    draw = ImageDraw.Draw(img)
    
    title = "VOTRE PUBLICITÉ ICI"
    subtitle = "Mettez en avant votre marque auprès de notre audience premium."
    button_text = " CONTACTEZ-NOUS "
    
    # Position text
    y_center = TARGET_HEIGHT / 2
    draw_text_centered(draw, title, font_title, y_center - 100)
    draw_text_centered(draw, subtitle, font_subtitle, y_center + 10)
    
    # Draw button
    bbox = font_button.getbbox(button_text)
    bw = bbox[2] - bbox[0]
    bh = bbox[3] - bbox[1]
    
    btn_w = bw + 80
    btn_h = bh + 40
    btn_x = (TARGET_WIDTH - btn_w) / 2
    btn_y = y_center + 120
    
    draw.rounded_rectangle([btn_x, btn_y, btn_x + btn_w, btn_y + btn_h], radius=10, fill=(216, 90, 48, 255))
    
    # Draw button text
    text_x = btn_x + (btn_w - bw) / 2
    text_y = btn_y + (btn_h - bh) / 2 - 5
    draw.text((text_x, text_y), button_text, font=font_button, fill=(255, 255, 255))
    
    # Save image
    out_path = os.path.join(OUTPUT_DIR, f"pub-placeholder-4.jpg")
    img.convert("RGB").save(out_path, quality=90)
    print(f"Saved {out_path}")

for i, img_id in enumerate(IMAGE_IDS):
    generate_banner(i, img_id)
