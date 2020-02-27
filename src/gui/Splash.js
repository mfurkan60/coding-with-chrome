/**
 * @fileoverview Splashscreen for the Coding with Chrome suite.
 *
 * @license Copyright 2020 The Coding with Chrome Authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @author mbordihn@google.com (Markus Bordihn)
 */

import { Version } from '../config/Config';
import { StackQueue } from '../utils/stack/StackQueue';

/**
 * Splash Screen class
 */
export class Splash {
  /**
   * @param {Object} stackQueueInstance
   * @constructor
   */
  constructor(stackQueueInstance = new StackQueue(false)) {
    this.currentProgress = 0;
    this.progressSize = 0;
    this.progressStep = 1;
    this.stackQueue = stackQueueInstance;
    this.startTime = Date.now();

    /** @type {node} */
    this.nodeVersion = document.querySelector(
      '#cwc-splash-screen > div.version'
    );

    /** @type {node} */
    this.nodeProgressBar = document.querySelector(
      '#cwc-splash-screen > div.content > div.progress > div.progress-bar > div'
    );

    /** @type {node} */
    this.nodeProgressText = document.querySelector(
      '#cwc-splash-screen > div.content > div.progress > div.progress-text'
    );

    /** @type {node} */
    this.nodeProgressTextLog = document.querySelector(
      '#cwc-splash-screen > div.content > div.progress > div.progress-text-log > ul'
    );
  }

  /**
   * Shows the splash screen.
   */
  show() {
    console.log('Showing Splashscreen ...');
    this.render();
  }

  /**
   * Render splash screen.
   */
  render() {
    if (this.nodeVersion) {
      this.nodeVersion.textContent = `Coding with Chrome Suite ${Version}`;
    }
  }

  /**
   * @param {String} name
   * @param {Function=} func
   */
  addStep(name, func) {
    if (func) {
      this.stackQueue.addPromise(() => {
        this.progress = (100 / this.progressSize) * this.progressStep++;
        this.progressText = name;
        return func();
      });
    } else {
      this.stackQueue.addCommand(() => {
        this.progress = (100 / this.progressSize) * this.progressStep++;
        this.progressText = name;
      });
    }
  }

  /**
   * @param {number} progress
   */
  set progress(progress) {
    console.log('Set Progress to', progress);
    this.currentProgress = progress;
    if (this.nodeProgressBar) {
      this.nodeProgressBar.style.transform = `translateX(-${100 - progress}%)`;
    }
  }

  /**
   * @return {number}
   */
  get progress() {
    return this.currentProgress;
  }

  /**
   * @param {String} text
   */
  set progressText(text) {
    console.log('Set Progress text to', text);
    if (this.nodeProgressText) {
      this.nodeProgressText.textContent = `${text}`;
    }
    if (this.nodeProgressTextLog) {
      const elapsedTime = (Date.now() - this.startTime) / 1000;
      const logEntry = document.createElement('li');
      const progressPer = Math.round(this.progress);
      logEntry.textContent = `[${progressPer}%] (${elapsedTime} sec) ${text}`;
      this.nodeProgressTextLog.appendChild(logEntry);
    }
  }

  /**
   * @return {string}
   */
  get progressText() {
    return this.currentProgressText;
  }

  /**
   *
   */
  execute() {
    this.progressSize = this.stackQueue.getSize();
    this.stackQueue.start();
  }
}