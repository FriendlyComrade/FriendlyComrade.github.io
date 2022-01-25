import ClipLoader from 'react-spinners/ClipLoader';

type ThemeValue = {
    theme: string;
}
const MainLoader= (theme: ThemeValue) => {
    const override = `
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        @media(max-width: 600px) {
            top: 42%;
            left: 42%;
            transform: translate(-50%, -50%);
        }
        @media(max-width: 300px) {
            top: 40%;
            left: 32%;
            transform: translate(-50%, -50%);
        }
    `;

    let color;
    if (theme.theme === "light") {
        color = "#000000";
    } else {
        color = "#255555";
    }

    return (
        <ClipLoader color={color} loading={true} css={override} size={100} />
    )
}
export default MainLoader;