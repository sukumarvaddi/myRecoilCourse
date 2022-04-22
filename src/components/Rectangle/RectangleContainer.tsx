import {Box} from '@chakra-ui/react'
import {ElementStyle} from './Rectangle'

type RectangleContainerProps = {
    position: ElementStyle['position']
    size: ElementStyle['size']
    onSelect: () => void
    id: number
}

export const RectangleContainer: React.FC<RectangleContainerProps> = ({children, size, position, onSelect, id}) => {
    const updatedPosition = {top: position.top + id * 30, left: position.left + id * 40}
    return (
        <Box
            position="relative"
            style={{...size, ...updatedPosition}}
            onMouseDown={() => onSelect()}
            onClick={(e) => e.stopPropagation()}
        >
            {children}
        </Box>
    )
}
