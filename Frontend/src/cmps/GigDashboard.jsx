import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Typography from '@mui/material/Typography'
import { Pie, Bar } from 'react-chartjs-2'
import { gigService } from '../services/gig.service.js'
import { InfoDiv } from "./InfoDiv.jsx"

export function GigDashboard() {
    const [avgCategoryPrices, setAvgCategoryPrices] = useState([])
    const [topCategories, setTopCategories] = useState([])
    const [mostExpensiveGig, setMostExpensiveGig] = useState(null)
    const [leastExpensiveGig, setLeastExpensiveGig] = useState(null)
    const [mostPopularGig, setMostPopularGig] = useState(null)
    const [totalGigs, setTotalGigs] = useState(0)

    useEffect(() => {
        const fetchGigs = async () => {
            const gigs = await gigService.query()

            // Variables for derived statistics
            let expensiveGig = gigs[0]
            let cheapGig = gigs[0]
            let popularGig = gigs[0]

            // Average price for each category and other statistics
            const categoryPrices = {}
            const categoryCounts = {}
            gigs.forEach(gig => {
                if (categoryPrices[gig.category]) {
                    categoryPrices[gig.category] += gig.price
                    categoryCounts[gig.category]++
                } else {
                    categoryPrices[gig.category] = gig.price
                    categoryCounts[gig.category] = 1
                }
                if (gig.price > expensiveGig.price) expensiveGig = gig
                if (gig.price < cheapGig.price) cheapGig = gig
                if (gig.reviews.length > popularGig.reviews.length) popularGig = gig
            })
            setMostExpensiveGig(expensiveGig)
            setLeastExpensiveGig(cheapGig)
            setMostPopularGig(popularGig)
            setTotalGigs(gigs.length)

            const categories = Object.keys(categoryPrices)
            const averages = categories.map(cat => categoryPrices[cat] / categoryCounts[cat])
            setAvgCategoryPrices({ categories, averages })

            // Top 10 most common categories
            const sortedCategories = Object.entries(categoryCounts).sort(([, aCount], [, bCount]) => bCount - aCount).slice(0, 10)
            setTopCategories({
                categories: sortedCategories.map(entry => entry[0]),
                counts: sortedCategories.map(entry => entry[1])
            })
        }
        fetchGigs()
    }, [])

    const barChartOptions = {
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                callbacks: {
                    title: function () {
                        return ''
                    },
                    label: function (context) {
                        return context.raw
                    }
                }
            }
        }
    }
    const pieChartOptions = {
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        return `${context.raw} gigs`
                    }
                }
            }
        }
    }

    return (
        <section className='dashboard-finances-container'>
            <h2>Gigs General Info:</h2>

            <section className="finance-info grid">
                <InfoDiv
                    title="Total Gigs"
                    info={totalGigs ? totalGigs : 'Loading...'}
                />
                <InfoDiv
                    title="Most expensive"
                    info={<Link to={`/gig/${mostExpensiveGig?._id}`}>{mostExpensiveGig ? `${mostExpensiveGig._id} (by ${mostExpensiveGig.ownerId})` : 'Loading...'}</Link>}
                />
                <InfoDiv
                    title="Least expensive"
                    info={<Link to={`/gig/${leastExpensiveGig?._id}`}>{leastExpensiveGig ? `${leastExpensiveGig._id} (by ${leastExpensiveGig.ownerId})` : 'Loading...'}</Link>}
                />
                <InfoDiv
                    title="Most popular (reviews)"
                    info={<Link to={`/gig/${mostPopularGig?._id}`}>{mostPopularGig ? `${mostPopularGig._id} (by ${mostPopularGig.ownerId})` : 'Loading...'}</Link>}
                />
            </section>

            <main className='grid finance-charts'>
                <div className="chart-section" style={{ backgroundColor: '#fff' }}>
                    <Typography variant="h6">Average Price by Category</Typography>
                    <Bar
                        data={{
                            labels: avgCategoryPrices.categories,
                            datasets: [{
                                label: 'Average Price',
                                data: avgCategoryPrices.averages,
                                backgroundColor: '#404145',
                                borderColor: '#222325',
                                borderWidth: 1
                            }]
                        }}
                        options={barChartOptions}
                    />
                </div>
                <div className="chart-section" style={{ backgroundColor: '#fff' }}>
                    <Typography variant="h6">Top 10 Most common (by category)</Typography>
                    <Pie
                        data={{
                            labels: topCategories.categories,
                            datasets: [{
                                label: 'Gig Count',
                                data: topCategories.counts,
                                backgroundColor: [
                                    '#FF6384', '#36A2EB', '#FFCE56', '#FF5733',
                                    '#33FF57', '#8533FF', '#33B5FF', '#FF8333',
                                    '#B833FF', '#FF335E'
                                ]
                            }]
                        }}
                        options={pieChartOptions}
                    />
                </div>
            </main>
        </section>
    )
}