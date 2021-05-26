import React from "react";

export interface ichangeHandler {
    name: string;
    value: any;
    setstate: any
    initState: any
}

export interface iUpdateSetting {
    tipe: 'darkMode',
    nilai?: boolean | number
}

export interface iKeepAwake {
    awake: false | true
}

export interface reducerAction {
    type: string;
    payload: any
}

export type funcType = (props?: any) => void

//** Dispatch Props */
export type AllDispatchProp = (arg0: {
    type?: string;
    payload?: any | void;
}) => void;

//** Action Props */
export type ActionProps = {
    type: any;
    payload: any | void;
};

export const usengefek: (func: funcType, depend?: any) => void = (func, depend) =>
    React.useEffect(func, depend);


export interface iRender {
    id: string;
    namaTarget: string;
    catatan?: string;
    waktuDibuat: Date;
    waktuSelesai?: Date | null;
}