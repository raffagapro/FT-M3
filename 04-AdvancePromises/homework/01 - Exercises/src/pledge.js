'use strict';
/*----------------------------------------------------------------
Promises Workshop: construye la libreria de ES6 promises, pledge.js
----------------------------------------------------------------*/
// // TU CÓDIGO AQUÍ:
//funcion constructora
function $Promise(executor){
    if (typeof executor !== 'function') throw new TypeError('Executor is not a function');
    this._state = 'pending';
    this._value = undefined;
    this._handlerGroups = [];
    executor(this._internalResolve.bind(this), this._internalReject.bind(this));
}

$Promise.prototype._internalResolve = function(value){
    if (this._state === "pending") {
        this._state = 'fulfilled';
        this._value = value;
        this._callHandlers();
    }
}
$Promise.prototype._internalReject = function(value){
    if (this._state === "pending") {
        this._state = 'rejected';
        this._value = value;
        this._callHandlers();
    }
}
$Promise.prototype._callHandlers = function(){
    //hay algo en el queue? (array)
    while (this._handlerGroups.length) {
        //tome el primer elemento del queue de promesas (this._handlerGroups)
        const cb = this._handlerGroups.shift();
        //reviso si la promesa ya esta resuelta
        if (this._state === 'fulfilled') {
            //hay algun CB para el success?
            if (cb.successCb) {
                try {
                    //ejecuto CB y guardo respuesta
                    const result = cb.successCb(this._value);
                    //si es una promesa nueva la guarda con then
                    if (result instanceof $Promise) {
                        return result.then(
                            (value)=>cb.downstreamPromise._internalResolve(value), //callback success
                            (error)=>cb.downstreamPromise._internalReject(error) //callback de reject
                        )
                    }else{
                        //si no manda resolucion
                        cb.downstreamPromise._internalResolve(result)
                    }
                } catch (error) {
                    //si hay error vanda rechazo
                    cb.downstreamPromise._internalReject(error)
                }
            }else{
                //si no se mando CB, solo se manda resolucin
                return cb.downstreamPromise._internalResolve(this._value)
            }
        } else if (this._state === 'rejected') {
            if (cb.errorCb) {
                try {
                    //ejecuto CB y guardo respuesta
                    const result = cb.errorCb(this._value);
                    //si es una promesa nueva la guarda con then
                    if (result instanceof $Promise) {
                        return result.then(
                            (value)=>cb.downstreamPromise._internalResolve(value), //callback success
                            (error)=>cb.downstreamPromise._internalReject(error) //callback de reject
                        )
                    }else{
                        //si no manda resolucion
                        cb.downstreamPromise._internalResolve(result)
                    }
                } catch (error) {
                    //si hay error vanda rechazo
                    cb.downstreamPromise._internalReject(error)
                }
            }else{
                //si no se mando CB, solo se manda resolucion
                return cb.downstreamPromise._internalReject(this._value)
            }
        }

    }
}

$Promise.prototype.then = function(successCb, errorCb){
    if (typeof successCb !== 'function') successCb = false;
    if (typeof errorCb !== 'function') errorCb = false;

    //crea nueva promesa y la guarda en la queue
    const downstreamPromise = new $Promise(()=>{});
    this._handlerGroups.push({
        successCb,
        errorCb,
        downstreamPromise
    });
    //revisa el estado de la promesa actual
    if (this._state !== "pending") this._callHandlers();
    return downstreamPromise;
}

$Promise.prototype.catch = function(errorCb){
    return this.then(null, errorCb)
}


// axios('url').then((response)=>{
//     //resolver exitosamente la proimesa
//     return response; //se pasa al sig then y se guarda en batman
//     //rechazar la promesa
//     throw TypeError(response); //se pasa al catch y el valor se guarda en robin
// }).then((batman)=>{}).then().catch((robin)=>{})



module.exports = $Promise;
/*-------------------------------------------------------
El spec fue diseñado para funcionar con Test'Em, por lo tanto no necesitamos
realmente usar module.exports. Pero aquí está para referencia:

module.exports = $Promise;

Entonces en proyectos Node podemos esribir cosas como estas:

var Promise = require('pledge');
…
var promise = new Promise(function (resolve, reject) { … });
--------------------------------------------------------*/
