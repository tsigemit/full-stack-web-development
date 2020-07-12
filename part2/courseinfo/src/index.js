import React from 'react';
import ReactDOM, { unstable_renderSubtreeIntoContainer } from 'react-dom';

const Header = ({ course }) => {
    return (
        <h1>{course.name}</h1>
    )
}

const Total = ({ course }) => {
    const arr=[]
   course.parts.map(ex => arr.push(ex.exercises))
   const total = arr.reduce((sum, current) => sum+current)
    return(
        <h6>total of {total} exercises</h6>
    )
}

const Part = (props) => {
    return (
        <p>
            {props.part.name} {props.part.exercises}
        </p>
    )
}

const Content = ({ course }) => {
    const coursePart = course.parts.map(part => {
        return (
            <Part part={part} />
        )
    })
    return (
        <div>
            {coursePart}
        </div>
    )
}
const Course =({course}) => {
    return (<div>
          <Header course={course} />
          <Content course={course} />
          <Total course={course} />
    </div>);
}
const App = () => {
    const courses = [
        {
            name: 'Half Stack application development',
            id: 1,
            parts: [
                {
                    name: 'Fundamentals of React',
                    exercises: 10,
                    id: 1
                },
                {
                    name: 'Using props to pass data',
                    exercises: 7,
                    id: 2
                },
                {
                    name: 'State of a component',
                    exercises: 14,
                    id: 3
                },
                {
                    name: 'Redux',
                    exercises: 11,
                    id: 4
                }
            ]
        },
        {
            name: 'Node.js',
            id: 2,
            parts: [
                {
                    name: 'Routing',
                    exercises: 3,
                    id: 1
                },
                {
                    name: 'Middlewares',
                    exercises: 7,
                    id: 2
                }
            ]
        }
    ]
    const curriculum=courses.map(course => {
        return <Course course={course} />
    })
    return (
        <>
        <h1>Web development curriculum</h1>
    <p>{curriculum}</p>
        </>
    );
    
}

ReactDOM.render(<App />, document.getElementById('root'))