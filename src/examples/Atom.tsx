import {atom, useRecoilState, useRecoilValue} from 'recoil'

const darkModeAtom = atom({
    key: 'darkMode',
    default: false,
})

function DarkMode() {
    const [darkMode, setDarkMode] = useRecoilState(darkModeAtom)

    return (
        <input
            type="checkbox"
            checked={darkMode}
            onChange={(event) => {
                setDarkMode(event?.target.checked)
            }}
        />
    )
}

function Button() {
    const darkMode = useRecoilValue(darkModeAtom)
    const buttonStyle = darkMode ? {backgroundColor: 'black', color: 'white'} : {}
    return <button style={buttonStyle}> My Ui Button</button>
}

function Atom() {
    return (
        <>
            <div>
                <DarkMode />
            </div>
            <div>
                <Button />
            </div>
        </>
    )
}

export default Atom
