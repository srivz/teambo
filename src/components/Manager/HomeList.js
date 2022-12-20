import React from "react";

export default function HomeList() {
  return (
    <div id="main">
      <div class="container">
        <div class="row">
          <div class="col-sm-6 col-md-6 mt-3">
            <h5>
              <img
                class="w-25 m-lg-2"
                src="./images/Group 3.svg"
                alt=""
              />
              <span class="border-left"></span>
              <span class="blue letter-spacing mt-2 ">MANAGER</span>
            </h5>
          </div>
          <div class="col-sm-6 col-md-6 mt-3">
            <h5 class="text-end">
              {" "}
              Pavithra <span class="grey h6 ">Manager</span>
              <span class="border-left"></span>
              <span class="blue mt-2 ">Log Out</span>
            </h5>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-3 col-md-3 mt-3">
            <div class="task-box">
              <h4 class="blue">Teammate Tasks</h4>
              <input
                class="rounded-2 p-1 w-100 mt-3"
                type="search"
                name="search"
                id="search"
                placeholder="Search"
              />
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="box-shadow  ">
                    <td>
                      <h5>Feri Abishek</h5>
                      <p class="grey">Video Editor / Graphic Designer</p>
                    </td>
                  </tr>
                  <tr class="box-shadow  ">
                    <td>
                      <h5>Surya</h5>
                      <p class="grey">Graphic Designer</p>
                    </td>
                  </tr>
                  <tr class="box-shadow  ">
                    <td>
                      <h5>Sivasundar</h5>
                      <p class="grey">Video Editor / Graphic Designer</p>
                    </td>
                  </tr>
                  <tr class="box-shadow  ">
                    <td>
                      <h5>Mithun</h5>
                      <p class="grey">Graphic Designer</p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="col-sm-9 col-md-9 mt-3">
            <div class="row">
              <div class="col-sm-6 col-md-6 mt-3">
                <h5 class="blue">Feri Abishek</h5>
                <h6>Video Editor / Graphic Designer</h6>
              </div>
              <div class="col-sm-6 col-md-6 mt-3 text-end">
                <div>
                  <i class="bi bi-list-ul p-lg-2"></i>
                  <i class="bi bi-grid-fill p-lg-2"></i>
                  <button
                    type="button"
                    class="btn btn-light bg-white box-shadow rounded-4">
                    <i class="bi bi-plus-square"></i> New Task
                  </button>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col ">
                <table class="table">
                  <thead>
                    <tr>
                      <th scope="col">Client</th>
                      <th scope="col">Task</th>
                      <th scope="col">Date</th>
                      <th scope="col">Time</th>
                      <th scope="col">Corrections</th>
                      <th scope="col">Status</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr class="box-shadow  ">
                      <td>Chaicup</td>
                      <td>Website UI</td>
                      <td>Jan,21 2023</td>
                      <td>11.00 am</td>
                      <td>+6</td>
                      <td class="green fw-bold">On Going</td>
                      <td class="text-end">
                        <i
                          onclick="myFunction()"
                          class="bi bi-three-dots-vertical blue"></i>
                        <div class="action-box ">
                          <div class="mb-2">
                            {" "}
                            <button class="btn btn-light">
                              <i class="bi bi-trash3 "></i> Delete
                            </button>
                          </div>
                          <div class="mb-2">
                            <button class="btn btn-light">
                              <i class="bi bi-trash3"></i> Move Up
                            </button>
                          </div>
                          <div class="mb-2">
                            {" "}
                            <button class="btn btn-light">
                              <i class="bi bi-caret-down-fill"></i> Move Down
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr class="box-shadow">
                      <td>Teabon</td>
                      <td>Menu</td>
                      <td>Jan,19 2023</td>
                      <td>11.00 am</td>
                      <td>0</td>
                      <td class="yellow fw-bold">Assigned</td>
                      <td class="text-end">
                        <i class="bi bi-three-dots-vertical blue"></i>
                        <div class="action-box ">
                          <div class="mb-2">
                            {" "}
                            <button class="btn btn-light">
                              <i class="bi bi-trash3 "></i> Delete
                            </button>
                          </div>
                          <div class="mb-2">
                            <button class="btn btn-light">
                              <i class="bi bi-trash3"></i> Move Up
                            </button>
                          </div>
                          <div class="mb-2">
                            {" "}
                            <button class="btn btn-light">
                              <i class="bi bi-caret-down-fill"></i> Move Down
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr class="box-shadow">
                      <td>TVS</td>
                      <td>Instagram ad Video</td>
                      <td>Jan,18 2023</td>
                      <td>11.00 am</td>
                      <td>+2</td>
                      <td class="blue fw-bold">Paused</td>
                      <td class="text-end">
                        <i class="bi bi-three-dots-vertical blue "></i>
                        <div class="action-box ">
                          <div class="mb-2">
                            {" "}
                            <button class="btn btn-light">
                              <i class="bi bi-trash3 "></i> Delete
                            </button>
                          </div>
                          <div class="mb-2">
                            <button class="btn btn-light">
                              <i class="bi bi-trash3"></i> Move Up
                            </button>
                          </div>
                          <div class="mb-2">
                            {" "}
                            <button class="btn btn-light">
                              <i class="bi bi-caret-down-fill"></i> Move Down
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr class="box-shadow">
                      <td>TVS</td>
                      <td>banner design</td>
                      <td>Jan,15 2023</td>
                      <td>11.00 am</td>
                      <td>+2</td>
                      <td class="fw-bold">Done</td>
                      <td class="text-end">
                        <button
                          type="button"
                          class="btn btn-light bg-white  ">
                          Correction
                        </button>
                        <i class="bi bi-three-dots-vertical blue"></i>
                      </td>
                    </tr>
                    <tr class="box-shadow">
                      <td>TVS</td>
                      <td>banner design</td>
                      <td>Jan,15 2023</td>
                      <td>11.00 am</td>
                      <td>+2</td>
                      <td class="fw-bold">Done</td>
                      <td class="text-end">
                        <button
                          type="button"
                          class="btn btn-light bg-white  ">
                          Correction
                        </button>
                        <i class="bi bi-three-dots-vertical blue"></i>
                        <div class="action-box ">
                          <div class="mb-2">
                            {" "}
                            <button class="btn btn-light">
                              <i class="bi bi-trash3 "></i> Delete
                            </button>
                          </div>
                          <div class="mb-2">
                            <button class="btn btn-light">
                              <i class="bi bi-trash3"></i> Move Up
                            </button>
                          </div>
                          <div class="mb-2">
                            {" "}
                            <button class="btn btn-light">
                              <i class="bi bi-caret-down-fill"></i> Move Down
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr class="box-shadow">
                      <td>TVS</td>
                      <td>banner design</td>
                      <td>Jan,15 2023</td>
                      <td>11.00 am</td>
                      <td>+2</td>
                      <td class="fw-bold">Done</td>
                      <td class="text-end">
                        <button
                          type="button"
                          class="btn btn-light bg-white  ">
                          Correction
                        </button>
                        <i class="bi bi-three-dots-vertical blue"></i>
                        <div class="action-box ">
                          <div class="mb-2">
                            {" "}
                            <button class="btn btn-light">
                              <i class="bi bi-trash3 "></i> Delete
                            </button>
                          </div>
                          <div class="mb-2">
                            <button class="btn btn-light">
                              <i class="bi bi-trash3"></i> Move Up
                            </button>
                          </div>
                          <div class="mb-2">
                            {" "}
                            <button class="btn btn-light">
                              <i class="bi bi-caret-down-fill"></i> Move Down
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr class="box-shadow">
                      <td>TVS</td>
                      <td>banner design</td>
                      <td>Jan,15 2023</td>
                      <td>11.00 am</td>
                      <td>+2</td>
                      <td class="fw-bold">Done</td>
                      <td class="text-end">
                        <button
                          type="button"
                          class="btn btn-light bg-white  ">
                          Correction
                        </button>
                        <i class="bi bi-three-dots-vertical blue"></i>
                        <div class="action-box ">
                          <div class="mb-2">
                            {" "}
                            <button class="btn btn-light">
                              <i class="bi bi-trash3 "></i> Delete
                            </button>
                          </div>
                          <div class="mb-2">
                            <button class="btn btn-light">
                              <i class="bi bi-trash3"></i> Move Up
                            </button>
                          </div>
                          <div class="mb-2">
                            {" "}
                            <button class="btn btn-light">
                              <i class="bi bi-caret-down-fill"></i> Move Down
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr class="box-shadow">
                      <td>TVS</td>
                      <td>banner design</td>
                      <td>Jan,15 2023</td>
                      <td>11.00 am</td>
                      <td>+2</td>
                      <td class="fw-bold">Done</td>
                      <td class="text-end">
                        <button
                          type="button"
                          class="btn btn-light bg-white  ">
                          Correction
                        </button>
                        <i class="bi bi-three-dots-vertical blue"></i>
                        <div class="action-box ">
                          <div class="mb-2">
                            {" "}
                            <button class="btn btn-light">
                              <i class="bi bi-trash3 "></i> Delete
                            </button>
                          </div>
                          <div class="mb-2">
                            <button class="btn btn-light">
                              <i class="bi bi-trash3"></i> Move Up
                            </button>
                          </div>
                          <div class="mb-2">
                            {" "}
                            <button class="btn btn-light">
                              <i class="bi bi-caret-down-fill"></i> Move Down
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
