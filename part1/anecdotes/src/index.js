import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
    console.log("check");
    const [selected, setSelected] = useState(0)
    const [countVote, setVote] = useState(0)
    const [counts, setCountArrays] = useState(Array(anecdotes.length).fill(0))
        
    console.log(selected)    
    
    console.log(counts)
    const countVotes = () => {
        const copy=[...counts]
        let update=copy[selected]
        update+=1
        copy[selected]=update;
        setCountArrays(copy)
        setVote(copy[selected])
    }
    const generateRandom =() => {
        let random = Math.floor(Math.random() * anecdotes.length)
        setSelected(random)  

    }

    return (
        <div>
            <p>{props.anecdotes[selected]}</p>
            <p>has {countVote} votes</p>
            <button onClick={countVotes}>vote</button>
            <button onClick={generateRandom}>next anecdote</button>  
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