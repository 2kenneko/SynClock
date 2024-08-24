from PIL import Image

def create_gif(frame_list, output_file, duration):
    images = []
    for frame in frame_list:
        img = Image.open(frame)
        images.append(img)
    
    images[0].save(
        output_file,
        save_all=True,
        format='GIF',
        append_images=images[1:],
        duration=duration,
        disposal=2,
        loop=0
    )

# フレームリスト
frame_list = [
    "1.png", "2.png", "3.png", "4.png",
    "5.png", "6.png", "7.png", "8.png", "9.png"
]

# 出力ファイル名
output_file = 'running-stickman-transparency.gif'

# フレーム間の遅延（ミリ秒）
duration = 40  # 例えば200ミリ秒

# GIFを作成
create_gif(frame_list, output_file, duration)
