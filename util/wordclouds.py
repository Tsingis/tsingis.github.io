from wordcloud import WordCloud
from PIL import Image, ImageDraw
from typing import List, Tuple
import numpy as np


def create_svg(filename: str, background_color: str, text_color: str) -> None:
    with open("buzzwords.txt", "r") as f:
        words = [word.strip() for word in f.readlines()]
        mask = create_mask((1000, 800))
        wordcloud = create_wordcloud(words, mask, background_color, text_color)
        svg = wordcloud.to_svg(embed_font=True)
        with open(filename, "w") as f:
            f.write(svg)


def create_mask(size: Tuple[int, int]) -> np.ndarray:
    mask = Image.new("L", size, 255)
    draw = ImageDraw.Draw(mask)
    draw.ellipse((0, 0) + size, fill=0)
    return np.array(mask)


def create_wordcloud(
    words: List[str], mask: Image, background_color: str, text_color: str
) -> WordCloud:
    wordcloud = WordCloud(
        background_color=background_color,
        mask=mask,
        contour_color=None,
        contour_width=0,
        mode="RGBA",
        color_func=lambda *args, **kwargs: text_color,
    )
    freqs = dict(zip(words, [1 for _ in range(len(words))]))
    return wordcloud.generate_from_frequencies(freqs)


if __name__ == "__main__":
    create_svg(
        filename="buzzwords.svg",
        text_color="rgba(244, 244, 244, 1)",
        background_color="rgba(51, 51, 51, 1)",
    )
