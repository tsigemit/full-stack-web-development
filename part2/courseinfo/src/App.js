import React from 'react'

const Header = (props) => {
    return (<h1>{props.course}</h1>);

}
const Contents = (props) => {
    const arr = props.parts.map((part, i) => {
        return (
            <p>{part.name} {part.exercises}</p>
        );
    });
    return (
        <div>
            {arr}
        </div>
    );
}

const Total = (props) => {
    const sum = props.exercises[0].exercises + 
                props.exercises[0].exercises +
                props.exercises[0].exercises;
    return (
        <p>Number of exercises {sum}</p>
    );
}
const App = () => {
    const course = {
        name: 'Half Stack application development',
        parts: [
            {
                name: 'Fundamentals of React',
                exercises: 10
            },
            {
                name: 'Using props to pass data',
                exercises: 7
            },
            {
                name: 'State of a component',
                exercises: 14
            }
        ]
    }
    return (
        <div>
            <Header course={course.name} />
            <Contents parts={course.parts} />
            <Total exercises={course.parts} />
        </div>
    )
}


export default App