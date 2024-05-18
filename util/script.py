from wordcloud import WordCloud
from PIL import Image, ImageDraw
from typing import List, Tuple
import numpy as np


def create_svg(filename: str) -> None:
    with open("buzzwords.txt", "r") as f:
        words = f.readlines()
    words = [word.strip() for word in words]
    mask = create_mask((1000, 800))
    wordcloud = create_wordcloud(words, mask)
    image = wordcloud.to_svg(embed_font=True)
    with open(filename, "w") as f:
        f.write(image)


def create_mask(size: Tuple[int, int]) -> np.ndarray:
    mask = Image.new("L", size, 255)
    draw = ImageDraw.Draw(mask)
    draw.ellipse((0, 0) + size, fill=0)
    return np.array(mask)


def create_wordcloud(words: List[str], mask: Image) -> WordCloud:
    wordcloud = WordCloud(
        background_color="white",
        mask=mask,
        contour_color=None,
        contour_width=0,
        color_func=lambda *args, **kwargs: "black",
    )
    freqs = dict(zip(words, [1 for _ in range(len(words))]))
    return wordcloud.generate_from_frequencies(freqs)


if __name__ == "__main__":
    create_svg("buzzwords.svg")
