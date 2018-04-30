/**
 * @license Copyright 2018 The Coding with Chrome Authors.
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
 * @author carheden@google.com (Adam Carheden)
 */


window.top['cwc-validated'] = function(code, res) {
  let msg = '<h2 style="font-style: italic; color: red;">' +
    'No right triangles yet. Keep trying.</h2>';
  if (res) {
    msg = '<h2 style="color: green">That\'s a right triangle. Great Job!</h2>';
  }
  document.getElementById('status').innerHTML = msg;
};
