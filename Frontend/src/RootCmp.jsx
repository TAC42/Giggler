import React from 'react'
import { Routes, Route } from 'react-router'

import routes from './routes'

import { AppHeader } from './cmps/AppHeader'
import { AppFooter } from './cmps/AppFooter'
import { UserDetails } from './pages/UserDetails'
import { GigIndex } from './pages/GigIndex'
import { GigDetails } from './pages/GigDetails'
import { HomePage } from './pages/HomePage'

export function RootCmp() {
    return (
        <main className='main-container'>
            <AppHeader />
            <main className='full'>
                <Routes>
                    {routes.map(route => <Route key={route.path} exact={true} element={route.component} path={route.path} />)}
                    <Route path="/" element={<HomePage />} />
                    <Route path="user/:id" element={<UserDetails />} />
                    <Route path="explore/" element={<GigIndex />} />
                    <Route path="gigdetails/" element={<GigDetails />} />
                    <Route path="gigdetails/:id" element={<GigDetails />} />
                </Routes>
            </main>
            <AppFooter />
        </main>
    )
}


