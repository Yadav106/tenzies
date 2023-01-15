import React from "react";
import { useState, useEffect } from "react";
import Die from "./Die"
import { nanoid } from "nanoid"
import Confetti from "react-confetti"

export default function App() {

    const [dice, setDice] = useState(allNewDice())
    const [tenzies, setTenzies] = useState(false)

    function generateNewDie() {
        return {
            value: Math.ceil(Math.random() * 6), 
            isHeld: false,
            id: nanoid()
        }
    }

    function allNewDice() {
        const newDice = []
        for (let i = 0; i < 10; i++) {
            newDice.push(generateNewDie())
        }
        return newDice
    }

    function rollDice() {
        setDice(oldDice => oldDice.map(die => {
            return die.isHeld ? die : generateNewDie()
        }))
    }

    function holdDice(id) {
        setDice(oldDice => oldDice.map(die => {
            die.isHeld = die.id === id ? !die.isHeld : die.isHeld
            return die
        }))
    }

    useEffect(() => {
        const firstValue = dice[0].value
        const holdAllDice = dice.every(die => die.isHeld)
        const allSameValue = dice.every(die => die.value === firstValue)
        if(holdAllDice && allSameValue) {
            setTenzies(true)
        }
    }, [dice])

    function newGame() {
        setDice(allNewDice())
        setTenzies(false)
    }

    const diceElements = dice.map(die => <Die value={die.value} key={die.id} isHeld={die.isHeld} holdDice={() => holdDice(die.id)}/>)

    return (
        <main>
            {tenzies && <Confetti />}
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <div className="dice-container" >
               {diceElements}
            </div>
            <button className="roll-dice"  onClick={tenzies ? newGame :rollDice}
            style={tenzies? {width:"150px"} : {width:"90px"}}>
                {tenzies ? "New Game" : "Roll"}
            </button>
        </main>
    )
}