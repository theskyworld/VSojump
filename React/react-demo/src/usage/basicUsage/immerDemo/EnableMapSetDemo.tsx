import produce from 'immer';
import React, { FC, useState } from 'react';
const EnableMapSetDemo: FC = () => {
    const [mapState, setMapState] = useState(new Map<string, { name: string, age: number }>());

    // 对Map进行操作
    function changeMapState() {
        const newMapState = produce(mapState, draft => {
            draft.set("Bob1", { name: "Bob1 Daily", age: 12 })
        });

        setMapState(newMapState);
    }
    return (
        <>
            <p>{JSON.stringify(Object.fromEntries(mapState))}</p>
            <button onClick={changeMapState}>changeMapState</button>
        </>
    );
};
export default EnableMapSetDemo;