import {useRecoilState, selector, selectorFamily, useRecoilValue} from 'recoil'
import {elementsFamily} from './components/Rectangle/Rectangle'
import {selectedAtom} from './Canvas'
import {InputGroup, InputRightElement, NumberInput, NumberInputField, styled, Text, VStack} from '@chakra-ui/react'
import _ from 'lodash'
import {produce} from 'immer'

// const selectedElementProperties = selector<Element | undefined>({
//     key: 'selectedElementProperties',
//     get: ({get}) => {
//         const selected = get(selectedAtom)
//         if (selected == null) {
//             return
//         }
//         return get(elementsFamily(selected))
//     },
//     set: ({get, set}, newValue) => {
//         const selected = get(selectedAtom)
//         if (selected == null || !newValue) {
//             return
//         }
//         set(elementsFamily(selected), newValue)
//     },
// })

const editPropertyState = selectorFamily<number | undefined, string>({
    key: 'editPropertyState',
    get:
        (path: string) =>
        ({get}) => {
            const selected = get(selectedAtom)
            if (selected == null) {
                return
            }
            const element = get(elementsFamily(selected))
            return _.get(element, path)
        },
    set:
        (path) =>
        ({set, get}, newValue) => {
            const selected = get(selectedAtom)
            if (selected == null) {
                return
            }
            const element = get(elementsFamily(selected))
            const fromElement = {style: {position: {...element.style.position}, size: {...element.style.size}}}
            _.set(fromElement, path, newValue)
            set(elementsFamily(selected), fromElement)
        },
})

export const EditProperties = () => {
    // const [elementStyle, setElementStyle] = useRecoilState(selectedElementProperties)
    // const path = useRecoilValue(editPropertyState('style.position.top'))
    // console.log(path)
    const selected = useRecoilValue(selectedAtom)
    if (selected == null) {
        return null
    }

    // const setPosition = (position: 'left' | 'top', value: number) => {
    //     setElementStyle({
    //         ...elementStyle,
    //         style: {
    //             position: {...elementStyle.style.position, [position]: value},
    //             size: {...elementStyle.style.size},
    //         },
    //     })
    // }

    // const setSize = (size: 'width' | 'height', value: number) => {
    //     setElementStyle({
    //         ...elementStyle,
    //         style: {
    //             position: {...elementStyle.style.position},
    //             size: {...elementStyle.style.size, [size]: value},
    //         },
    //     })
    // }

    return (
        <Card>
            <Section heading="Position">
                <Property label="Top" path="style.position.top" />
                <Property label="left" path="style.position.left" />
                <Property label="width" path="style.size.width" />
                <Property label="height" path="style.size.height" />
                {/* <Property
                    label="Left"
                    value={elementStyle.style.position.left}
                    onChange={(left) => {
                        setPosition('left', left)
                    }}
                />

                <Property
                    label="width"
                    value={elementStyle.style.size.width}
                    onChange={(top) => {
                        setSize('width', top)
                    }}
                />
                <Property
                    label="height"
                    value={elementStyle.style.size.height}
                    onChange={(left) => {
                        setSize('height', left)
                    }}
                /> */}
            </Section>
        </Card>
    )
}

const Section: React.FC<{heading: string}> = ({heading, children}) => {
    return (
        <VStack spacing={2} align="flex-start">
            <Text fontWeight="500">{heading}</Text>
            {children}
        </VStack>
    )
}

// const Property = ({label, value, onChange}: {label: string; value: number; onChange: (value: number) => void}) => {
//     return (
//         <div>
//             <Text fontSize="14px" fontWeight="500" mb="2px">
//                 {label}
//             </Text>
//             <InputGroup size="sm" variant="filled">
//                 <NumberInput value={value} onChange={(_, value) => onChange(value)}>
//                     <NumberInputField borderRadius="md" />
//                     <InputRightElement pointerEvents="none" children="px" lineHeight="1" fontSize="12px" />
//                 </NumberInput>
//             </InputGroup>
//         </div>
//     )
// }
const Property = ({label, path}: {label: string; path: string}) => {
    const [property, setProperty] = useRecoilState(editPropertyState(path))
    return (
        <div>
            <Text fontSize="14px" fontWeight="500" mb="2px">
                {label}
            </Text>
            <InputGroup size="sm" variant="filled">
                <NumberInput value={property} onChange={(_, value) => setProperty(value)}>
                    <NumberInputField borderRadius="md" />
                    <InputRightElement pointerEvents="none" children="px" lineHeight="1" fontSize="12px" />
                </NumberInput>
            </InputGroup>
        </div>
    )
}

const Card: React.FC = ({children}) => (
    <VStack
        position="absolute"
        top="20px"
        right="20px"
        backgroundColor="white"
        padding={2}
        boxShadow="md"
        borderRadius="md"
        spacing={3}
        align="flex-start"
        onClick={(e) => e.stopPropagation()}
    >
        {children}
    </VStack>
)
