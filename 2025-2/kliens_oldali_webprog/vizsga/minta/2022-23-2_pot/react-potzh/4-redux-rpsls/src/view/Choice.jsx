import lizard from "/lizard.png";
import paper from "/paper.png";
import rock from "/rock.png";
import scissors from "/scissors.png";
import spock from "/spock.png";
import "./Choice.css";
import { FIG } from "../utils/utils";

export default function Choice ({ isPlayer, sign }) {
    let src = null;
    if (sign === FIG.LIZARD) src = lizard;
    if (sign === FIG.PAPER) src = paper;
    if (sign === FIG.ROCK) src = rock;
    if (sign === FIG.SCISSORS) src = scissors;
    if (sign === FIG.SPOCK) src = spock;

    return (
        <figure>
            <img 
                src={src}
            ></img>
            <figcaption>{sign}</figcaption>
        </figure>
    )
}