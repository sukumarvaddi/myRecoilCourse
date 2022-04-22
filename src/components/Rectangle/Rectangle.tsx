import React from 'react'
import {Drag} from '../Drag'
import {RectangleContainer} from './RectangleContainer'
import {RectangleInner} from './RectangleInner'
import {selectedAtom} from '../../Canvas'
import {useRecoilState, atomFamily} from 'recoil'
import {Resize} from '../Resize'
export type ElementStyle = {
    position: {top: number; left: number}
    size: {width: number; height: number}
}

export type Element = {style: ElementStyle}

export const elementsFamily = atomFamily<Element, number | null>({
    key: 'element',
    default: {
        style: {
            position: {top: 70, left: 130},
            size: {width: 100, height: 100},
        },
    },
})

export const Rectangle = React.memo(({id}: {id: number}) => {
    const [selectedElement, setSelectedElement] = useRecoilState(selectedAtom)
    const [element, setElement] = useRecoilState(elementsFamily(id))
    const selected = id === selectedElement
    return (
        <RectangleContainer
            position={element.style.position}
            id={id}
            size={element.style.size}
            onSelect={() => {
                setSelectedElement(id)
            }}
        >
            <Resize
                selected={selected}
                position={element.style.position}
                size={element.style.size}
                onResize={(style) => {
                    setElement({...element, style})
                }}
            ></Resize>
            <Drag
                position={element.style.position}
                onDrag={(position) => {
                    setElement({style: {...element.style, position}})
                }}
            >
                <div>
                    <RectangleInner selected={selected} />
                </div>
            </Drag>
        </RectangleContainer>
    )
})
