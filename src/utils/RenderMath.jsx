import { InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';

function RenderMath({ text }) {
    if (!text) {
        return null;
    }

    const parts = text.split(/(\$[^$]+\$)/g);
    return (parts.map((part,i) => 
        (part.startsWith('$') && part.endsWith('$') 
        ? <InlineMath key={i} math={part.slice(1,-1)}/>
        : <span key={i}>{part}</span>)
    ))
}

export default RenderMath