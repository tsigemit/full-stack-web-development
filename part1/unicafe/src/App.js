import React, {useState} from 'react'

const SumAll = ({all}) => { 
    const sum = all[0]+all[1]+all[2];
    return (
    <p>all {sum}</p>
    )

}

const Postive = ({all}) => {
    const sum = all[0]+all[1]+all[2];
    if(all[1]==0 && all[2]==0)
    return (
        <p>postive 100 %</p>
    )
    else
    return (
    <p>{all[0]/sum*100} %</p>
    )
}
const Statistic = ({values}) => {
    const sum = values[0]+values[1]+values[2];
    if(values[0]==0 && values[1]==0 && values[2]==0)
    return(
        <p>No feedback given </p>
    )
    return (
    <>
    <table>
        <tr> 
            <td> good </td> 
            <td>{values[0]} </td>
        </tr>
        <tr>
            <td> neutral </td> 
            <td> {values[1]} </td>
        </tr>
        <tr>
            <td> bad </td> <td> {values[2]} </td>
        </tr>
        <tr>
            <td> all </td> <td> {sum} </td>
        </tr> 
        <tr>
            <td> average </td> <td> {sum / values.length} </td>
        </tr>
            <td> average </td> <td> <Postive all={[values[0], values[1], values[2]]} /> </td>
        <tr>
             
        </tr>
        
    </table> 
</>
    );

}
const Button = ({ onClick, text }) => (
    <button onClick={onClick}>  {text}  </button>
)
const App = () => {

    const [good, setGood] = useState(0)
    const [neutral,setNeutral] = useState(0)
    const [bad,  setBad] = useState(0)

    const setGoodFunction = () => {
        setGood(good+1);

    }
    const setNeutralFunction= () => {
        setNeutral(neutral+1);

    }
    const setBadFunction = () => {
        setBad(bad+1);

    }

    return (
        <div>
            <h1>Give feedback</h1>
            <Button onClick={setGoodFunction} text = "good" />
            <Button onClick={setNeutralFunction} text = "neutral" />
            <Button onClick={setBadFunction} text = "bad" />
            <h2>Statistics</h2>
            <Statistic values={[good,neutral,bad]} />
        </div>
    )
}


export default App