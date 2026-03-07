import styled from "styled-components";
// -----------------------------------------------------------------------------
export const StyledGameInterface = styled.div`
  /* border: 1px solid green; */
  position: fixed;
  z-index: 100;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  /* width: 350px; */
  padding: 30px;
  background-color: rgba(104, 2, 77, 0.88);
  /* backdrop-filter: blur(5px); */
  box-shadow:
    inset -5px 2px 30px rgba(200, 200, 200, 0.8),
    10px 10px 3px rgba(0, 0, 0, 0.6);

  color: hotpink;
  /* border-radius: 30px; */
  text-align: center;
  right: 4vw;
  bottom: 4vw;
  background: linear-gradient(0deg, purple, hotpink);
  text-transform: uppercase;
  .current-player {
    max-width: 80px;
    max-height: 80px;
  }
  h1 {
    font-size: 2vw;
    text-shadow: 2px 2px 0px rgba(0, 0, 0, 0.2);
    color: transparent;
    background: linear-gradient(180deg, pink, white, hotpink);
    background-clip: text;
  }
  h2 {
    font-size: 1vw;
    text-shadow: 2px 2px 0px rgba(0, 0, 0, 0.2);
    color: transparent;
    background: linear-gradient(180deg, pink, hotpink);
    background-clip: text;
  }
`;
// -----------------------------------------------------------------------------
