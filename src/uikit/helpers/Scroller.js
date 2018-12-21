"use strict";
/*
 * Copyright (C) 2006 The Android Open Source Project
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const Now_1 = require("./Now");
class ViscousFluidInterpolator {
    static viscousFluid(x) {
        x *= ViscousFluidInterpolator.VISCOUS_FLUID_SCALE;
        if (x < 1.0) {
            x -= (1.0 - Math.exp(-x));
        }
        else {
            const start = 0.36787944117; // 1/e == exp(-1)
            x = 1.0 - Math.exp(1.0 - x);
            x = start + x * (1.0 - start);
        }
        return x;
    }
    getInterpolation(input) {
        const interpolated = ViscousFluidInterpolator.VISCOUS_FLUID_NORMALIZE * ViscousFluidInterpolator.viscousFluid(input);
        if (interpolated > 0) {
            return interpolated + ViscousFluidInterpolator.VISCOUS_FLUID_OFFSET;
        }
        return interpolated;
    }
}
ViscousFluidInterpolator.VISCOUS_FLUID_SCALE = 8.0;
{
    ViscousFluidInterpolator.VISCOUS_FLUID_NORMALIZE = 1.0 / ViscousFluidInterpolator.viscousFluid(1.0);
    ViscousFluidInterpolator.VISCOUS_FLUID_OFFSET = 1.0 - ViscousFluidInterpolator.VISCOUS_FLUID_NORMALIZE * ViscousFluidInterpolator.viscousFluid(1.0);
}
class Scroller {
    constructor() {
        this.mode = 0;
        this.startX = 0;
        this.startY = 0;
        this.finalX = 0;
        this.finalY = 0;
        this.minX = 0;
        this.maxX = 0;
        this.minY = 0;
        this.maxY = 0;
        this.currX = 0;
        this.currY = 0;
        this.startTime = 0;
        this.duration = 0;
        this.durationReciprocal = 0.0;
        this.deltaX = 0.0;
        this.deltaY = 0.0;
        this.finished = false;
        this.flywheel = false;
        this.velocity = 0.0;
        this.currVelocity = 0.0;
        this.distance = 0;
        this.flingFriction = 0.015;
        this.deceleration = 0.0;
        this.physicalCoeff = 0.0;
        this.finished = true;
        this.interpolator = new ViscousFluidInterpolator();
        this.deceleration = this.computeDeceleration(0.015);
        this.physicalCoeff = this.computeDeceleration(0.84); // look and feel tuning
    }
    setFriction(friction) {
        this.deceleration = this.computeDeceleration(friction);
        this.flingFriction = friction;
    }
    computeDeceleration(friction) {
        return 9.80665 // g (m/s^2)
            * 39.37 // inch/meter
            * 160.0
            * friction;
    }
    forceFinished(finished) {
        this.finished = finished;
    }
    getCurrVelocity() {
        return this.mode == Scroller.FLING_MODE ?
            this.currVelocity : this.velocity - this.deceleration * this.timePassed() / 2000.0;
    }
    computeScrollOffset() {
        if (this.finished) {
            return false;
        }
        const timePassed = (Now_1.currentAnimationTimeMillis() - this.startTime);
        if (timePassed < this.duration) {
            switch (this.mode) {
                case Scroller.SCROLL_MODE:
                    const x = this.interpolator.getInterpolation(timePassed * this.durationReciprocal);
                    this.currX = this.startX + Math.round(x * this.deltaX);
                    this.currY = this.startY + Math.round(x * this.deltaY);
                    break;
                case Scroller.FLING_MODE:
                    const t = timePassed / this.duration;
                    const index = Math.floor((Scroller.NB_SAMPLES * t));
                    let distanceCoef = 1;
                    let velocityCoef = 0;
                    if (index < Scroller.NB_SAMPLES) {
                        const t_inf = index / Scroller.NB_SAMPLES;
                        const t_sup = (index + 1) / Scroller.NB_SAMPLES;
                        const d_inf = Scroller.SPLINE_POSITION[index];
                        const d_sup = Scroller.SPLINE_POSITION[index + 1];
                        velocityCoef = (d_sup - d_inf) / (t_sup - t_inf);
                        distanceCoef = d_inf + (t - t_inf) * velocityCoef;
                    }
                    this.currVelocity = velocityCoef * this.distance / (this.duration * 1000.0);
                    this.currX = this.startX + Math.round(distanceCoef * (this.finalX - this.startX));
                    // Pin to mMinX <= this.CurrX<= mMaxX
                    this.currX = Math.min(this.currX, this.maxX);
                    this.currX = Math.max(this.currX, this.minX);
                    this.currY = this.startY + Math.round(distanceCoef * (this.finalY - this.startY));
                    // Pin to mMinY <= this.CurrY  <= mMaxY
                    this.currY = Math.min(this.currY, this.maxY);
                    this.currY = Math.max(this.currY, this.minY);
                    if (this.currX == this.finalX && this.currY == this.finalY) {
                        this.finished = true;
                    }
                    break;
            }
        }
        else {
            this.currX = this.finalX;
            this.currY = this.finalY;
            this.finished = true;
        }
        return true;
    }
    startScroll(startX, startY, dx, dy, duration = Scroller.DEFAULT_DURATION) {
        this.mode = Scroller.SCROLL_MODE;
        this.finished = false;
        this.duration = duration;
        this.startTime = Now_1.currentAnimationTimeMillis();
        this.startX = startX;
        this.startY = startY;
        this.finalX = startX + dx;
        this.finalY = startY + dy;
        this.deltaX = dx;
        this.deltaY = dy;
        this.durationReciprocal = 1.0 / this.duration;
    }
    fling(startX, startY, velocityX, velocityY, minX, maxX, minY, maxY) {
        // Continue a scroll or fling in progress
        this.mode = Scroller.FLING_MODE;
        this.finished = false;
        const velocity = Math.hypot(velocityX, velocityY);
        this.velocity = velocity;
        this.duration = this.getSplineFlingDuration(velocity);
        this.startTime = Now_1.currentAnimationTimeMillis();
        this.startX = startX;
        this.startY = startY;
        const coeffX = velocity == 0 ? 1.0 : velocityX / velocity;
        const coeffY = velocity == 0 ? 1.0 : velocityY / velocity;
        const totalDistance = this.getSplineFlingDistance(velocity);
        this.distance = (totalDistance * Math.sign(velocity));
        this.minX = minX;
        this.maxX = maxX;
        this.minY = minY;
        this.maxY = maxY;
        this.finalX = startX + Math.round(totalDistance * coeffX);
        // Pin to mMinX <= mFinalX <= mMaxX
        this.finalX = Math.min(this.finalX, this.maxX);
        this.finalX = Math.max(this.finalX, this.minX);
        this.finalY = startY + Math.round(totalDistance * coeffY);
        // Pin to mMinY <= mFinalY <= mMaxY
        this.finalY = Math.min(this.finalY, this.maxY);
        this.finalY = Math.max(this.finalY, this.minY);
    }
    getSplineDeceleration(velocity) {
        return Math.log(Scroller.INFLEXION * Math.abs(velocity) / (this.flingFriction * this.physicalCoeff));
    }
    getSplineFlingDuration(velocity) {
        const l = this.getSplineDeceleration(velocity);
        const decelMinusOne = Scroller.DECELERATION_RATE - 1.0;
        return (1000.0 * Math.exp(l / decelMinusOne));
    }
    getSplineFlingDistance(velocity) {
        const l = this.getSplineDeceleration(velocity);
        const decelMinusOne = Scroller.DECELERATION_RATE - 1.0;
        return this.flingFriction * this.physicalCoeff * Math.exp(Scroller.DECELERATION_RATE / decelMinusOne * l);
    }
    abortAnimation() {
        this.currX = this.finalX;
        this.currY = this.finalY;
        this.finished = true;
    }
    extendDuration(extend) {
        const passed = this.timePassed();
        this.duration = passed + extend;
        this.durationReciprocal = 1.0 / this.duration;
        this.finished = false;
    }
    timePassed() {
        return Now_1.currentAnimationTimeMillis() - this.startTime;
    }
    setFinalX(newX) {
        this.finalX = newX;
        this.deltaX = this.finalX - this.startX;
        this.finished = false;
    }
    setFinalY(newY) {
        this.finalY = newY;
        this.deltaY = this.finalY - this.startY;
        this.finished = false;
    }
    isScrollingInDirection(xvel, yvel) {
        return !this.finished && Math.sign(xvel) == Math.sign(this.finalX - this.startX) &&
            Math.sign(yvel) == Math.sign(this.finalY - this.startY);
    }
}
Scroller.DEFAULT_DURATION = 250;
Scroller.SCROLL_MODE = 0;
Scroller.FLING_MODE = 1;
Scroller.DECELERATION_RATE = (Math.log(0.78) / Math.log(0.9));
Scroller.INFLEXION = 0.35; // Tension lines cross at (INFLEXION, 1)
Scroller.START_TENSION = 0.5;
Scroller.END_TENSION = 1.0;
Scroller.P1 = Scroller.START_TENSION * Scroller.INFLEXION;
Scroller.P2 = 1.0 - Scroller.END_TENSION * (1.0 - Scroller.INFLEXION);
Scroller.NB_SAMPLES = 100;
Scroller.SPLINE_POSITION = [];
Scroller.SPLINE_TIME = [];
exports.Scroller = Scroller;
{
    let x_min = 0.0;
    let y_min = 0.0;
    for (var i = 0; i < Scroller.NB_SAMPLES; i++) {
        let alpha = i / Scroller.NB_SAMPLES;
        let x_max = 1.0;
        let x = 0.0, tx = 0.0, coef = 0.0;
        while (true) {
            x = x_min + (x_max - x_min) / 2.0;
            coef = 3.0 * x * (1.0 - x);
            tx = coef * ((1.0 - x) * Scroller.P1 + x * Scroller.P2) + x * x * x;
            if (Math.abs(tx - alpha) < 1E-5)
                break;
            if (tx > alpha)
                x_max = x;
            else
                x_min = x;
        }
        Scroller.SPLINE_POSITION[i] = coef * ((1.0 - x) * Scroller.START_TENSION + x) + x * x * x;
        let y_max = 1.0;
        let y = 0.0, dy = 0.0;
        while (true) {
            y = y_min + (y_max - y_min) / 2.0;
            coef = 3.0 * y * (1.0 - y);
            dy = coef * ((1.0 - y) * Scroller.START_TENSION + y) + y * y * y;
            if (Math.abs(dy - alpha) < 1E-5)
                break;
            if (dy > alpha)
                y_max = y;
            else
                y_min = y;
        }
        Scroller.SPLINE_TIME[i] = coef * ((1.0 - y) * Scroller.P1 + y * Scroller.P2) + y * y * y;
    }
    Scroller.SPLINE_POSITION[Scroller.NB_SAMPLES] = Scroller.SPLINE_TIME[Scroller.NB_SAMPLES] = 1.0;
}
