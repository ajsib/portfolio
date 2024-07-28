/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useEffect, useState } from "react";
import Card from "./Card";

const containerStyle = css`
  background-color: var(--background-color);
  color: var(--text-color);
  height: 100vh;
  padding: 4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;
`;

const titleStyle = css`
  padding-top: 4rem;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 2rem;
`;

const cardsContainerStyle = css`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: auto auto;
  gap:4rem;
  width: 70vw;
  height: 60vh;
  max-width: calc(100vw - 16rem);
  padding-bottom: 4rem;
`;

const cardStyle = (transform: string) => css`
  transform: translate(${transform});
  transition: transform 0.5s ease;
`;

const InfoCards = () => {
  const [leftTransform, setLeftTransform] = useState("200px, 0");
  const [rightTransform, setRightTransform] = useState("-200px, 0");
  const [bottomTransform, setBottomTransform] = useState("0, 200px");

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const threshold = 3.6 * window.innerHeight; // 360vh

      if (scrollY > threshold) {
        setLeftTransform("0, 0");
        setRightTransform("0, 0");
        setBottomTransform("0, 0");
      } else {
        setLeftTransform("200px, 0");
        setRightTransform("-200px, 0");
        setBottomTransform("0, 200px");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div css={containerStyle}>
      <div css={titleStyle}>My Approach and Values</div>
      <div css={cardsContainerStyle}>
        <Card title="Innovate" icon={"💡"} css={cardStyle(rightTransform)}>
          Innovate
        </Card>
        <Card title="Lead" icon={"🧑‍🤝‍🧑"} css={cardStyle(leftTransform)}>
          Lead
        </Card>
        <Card title="Learn" icon={"📚"} css={[cardStyle(bottomTransform), { gridColumn: "span 2" }]}>
          Learn
        </Card>
      </div>
    </div>
  );
};

export default InfoCards;
