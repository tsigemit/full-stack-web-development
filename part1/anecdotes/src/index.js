import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
    const [selected, setSelected] = useState(0)
    const [countVote, setVote] = useState(0)
    const [counts, setCountArrays] = useState(Array(anecdotes.length).fill(0))

    const countVotes = () => {
        const copy = [...counts]
        copy[selected]+=1
        setVote(copy[selected])
        setCountArrays(copy)  
    }
    const generateRandom =() => {
        let random = Math.floor(Math.random() * anecdotes.length)
        setSelected(random) 
        setVote(counts[random])

    }

    return (
        <div>
            <h1>Anecdotes of the day</h1>
            <p>{props.anecdotes[selected]}</p>
            <p>has {countVote} votes</p>
            <button onClick={countVotes}>vote</button>
            <button onClick={generateRandom}>next anecdote</button>  
            <h1>Anecdotes with most votes</h1>
            <p>{props.anecdotes[counts.indexOf(Math.max(...counts))]}</p>
        </div>
    )
}   

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]
ReactDOM.render(
    <App anecdotes={anecdotes}/>,
    document.getElementById('root')
)