import { FC, ReactNode } from "react";
import { useI18n } from "./i18n.hook";

interface IProps {
  i18nKey: string;
  components?: Record<string, ReactNode>;
}

export const Trans: FC<IProps> = ({ i18nKey, components }) => {
  const { t } = useI18n();

  // Get the translated string for the given key
  const translatedText = t(i18nKey);

  // Create an array to hold parts of the translated string with JSX elements
  const translatedParts: (string | ReactNode)[] = [];

  // If there are components to inject, handle them by splitting the translated string
  if (components) {
    let lastIndex = 0;

    Object.keys(components).forEach((componentKey) => {
      // Find the position of the placeholder in the translated string
      const regex = new RegExp(`<${componentKey} ?/>`, "g");
      const matches = [...translatedText.matchAll(regex)];

      matches.forEach((match) => {
        // Add text before the match as a part
        translatedParts.push(translatedText.slice(lastIndex, match.index));

        // Add the component corresponding to the match with unique key
        translatedParts.push(
          <span key={componentKey}>{components[componentKey]}</span>
        );

        // Update the lastIndex for next match
        lastIndex = match.index + match[0].length;
      });
    });

    // Add the remaining part of the string after the last match
    translatedParts.push(translatedText.slice(lastIndex));
  } else {
    // If no components, just use the translated string as plain text
    translatedParts.push(translatedText);
  }

  return <>{translatedParts}</>;
};
