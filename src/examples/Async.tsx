import {Container, Heading, Text} from '@chakra-ui/layout'
import {Select} from '@chakra-ui/select'
import React from 'react'
import {atom, selectorFamily, useRecoilValue} from 'recoil'

const userIdState = atom<number | undefined>({
    key: 'userId',
    default: undefined,
})
//@ts-ignore
const userInfoSelector = selectorFamily({
    key: 'userInfoSelector',
    get: (userId: {userId: string}) => async () => {
        const result = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
        const userInfo = await result.json()
        return userInfo
    },
})
//@ts-ignore
function User({userId}) {
    const {name, phone} = useRecoilValue(userInfoSelector(userId))
    return (
        <React.Suspense fallback={<div>Loading...</div>}>
            <div>
                <Heading as="h2" size="md" mb={1}>
                    User data:
                </Heading>
                <Text>
                    <b>Name:</b> {name}
                </Text>
                <Text>
                    <b>Phone:</b> {phone}
                </Text>
            </div>
        </React.Suspense>
    )
}

export const Async = () => {
    // const [userId, setUserId] = useRecoilState(userIdState)

    const [userId, setUserId] = React.useState<number | undefined>()

    return (
        <Container py={10}>
            <Heading as="h1" mb={4}>
                View Profile
            </Heading>
            <Heading as="h2" size="md" mb={1}>
                Choose a user:
            </Heading>
            <Select
                placeholder="Choose a user"
                mb={4}
                value={userId}
                onChange={(event) => {
                    const value = event.target.value
                    setUserId(value ? parseInt(value) : undefined)
                }}
            >
                <option value="1">User 1</option>
                <option value="2">User 2</option>
                <option value="3">User 3</option>
            </Select>
            {userId !== undefined && <User userId={userId} />}
        </Container>
    )
}
