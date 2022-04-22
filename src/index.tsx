import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Canvas from './Canvas'
import {ChakraProvider} from '@chakra-ui/react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {RecoilRoot} from 'recoil'
import Atom from './examples/Atom'
import {Selectors} from './examples/Selectors'
import {Async} from './examples/Async'
ReactDOM.render(
    <React.StrictMode>
        <RecoilRoot>
            <ChakraProvider>
                <Router>
                    <Switch>
                        <Route path="/atoms">
                            <Atom />
                        </Route>
                        <Route path="/selectors">
                            <Selectors />
                        </Route>
                        <Route path="/async">
                            <React.Suspense fallback={<div>Loading...</div>}>
                                <Async />
                            </React.Suspense>
                        </Route>
                        <Route>
                            <Canvas />
                        </Route>
                    </Switch>
                </Router>
            </ChakraProvider>
        </RecoilRoot>
    </React.StrictMode>,
    document.getElementById('root'),
)
