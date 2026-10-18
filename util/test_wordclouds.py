import tempfile
import unittest
import xml.etree.ElementTree as ET
from pathlib import Path

from wordclouds import create_svg


class CreateSvgTests(unittest.TestCase):
    def test_create_svg_contains_all_buzzwords(self):
        words_path = Path(__file__).with_name("buzzwords.txt")

        with tempfile.TemporaryDirectory() as directory:
            output = Path(directory) / "buzzwords.svg"
            create_svg(
                str(output),
                background_color="rgba(51, 51, 51, 1)",
                text_color="rgba(244, 244, 244, 1)",
                random_state=42,
            )

            self.assertTrue(output.is_file())

            root = ET.parse(output).getroot()
            self.assertTrue(root.tag.endswith("svg"))

            generated_text = {
                text.strip()
                for element in root.iter()
                if element.tag.endswith("text")
                for text in element.itertext()
                if text.strip()
            }
            expected_words = {
                word.strip()
                for word in words_path.read_text(encoding="utf-8").splitlines()
                if word.strip()
            }

            self.assertLessEqual(expected_words, generated_text)


if __name__ == "__main__":
    unittest.main()
