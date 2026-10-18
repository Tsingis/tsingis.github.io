from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw
from wordcloud import WordCloud


def create_svg(
    filename: str,
    background_color: str,
    text_color: str,
    random_state: int | None = None,
) -> None:
    base_dir = Path(__file__).resolve().parent
    words_path = base_dir / "buzzwords.txt"
    if Path(filename).is_absolute():
        output_path = Path(filename)
    else:
        output_path = base_dir / filename

    with words_path.open("r", encoding="utf-8") as f:
        words = [word.strip() for word in f.readlines()]
        mask = create_mask((1000, 800))
        wordcloud = create_wordcloud(
            words, mask, background_color, text_color, random_state
        )
        svg = wordcloud.to_svg(embed_font=True)
        with output_path.open("w", encoding="utf-8") as f:
            f.write(svg)


def create_mask(size: tuple[int, int]) -> np.ndarray:
    mask = Image.new("L", size, 255)
    draw = ImageDraw.Draw(mask)
    draw.ellipse((0, 0) + size, fill=0)
    return np.array(mask)


def create_wordcloud(
    words: list[str],
    mask: Image,
    background_color: str,
    text_color: str,
    random_state: int | None = None,
) -> WordCloud:
    wordcloud = WordCloud(
        background_color=background_color,
        mask=mask,
        contour_color=None,
        contour_width=0,
        mode="RGBA",
        color_func=lambda *args, **kwargs: text_color,
        random_state=random_state,
    )
    freqs = dict(zip(words, [1 for _ in range(len(words))]))
    return wordcloud.generate_from_frequencies(freqs)


if __name__ == "__main__":
    create_svg(
        filename="buzzwords.svg",
        text_color="rgba(244, 244, 244, 1)",
        background_color="rgba(51, 51, 51, 1)",
    )
