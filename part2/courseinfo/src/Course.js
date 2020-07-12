import React from 'react'

const Header = ({ course }) => {
    return (
        <h1>{course.name}</h1>
    )
}

const Total = ({ course }) => {
    const arr = []
    course.parts.map(ex => arr.push(ex.exercises))
    const total = arr.reduce((sum, current) => sum + current)
    return (
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

const Course = ({ course }) => {
    return (<div>
        <Header course={course} />
        <Content course={course} />
        <Total course={course} />
    </div>);
}

export default Course;