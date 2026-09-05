import { useRef, useState } from "react";
import { faker } from "@faker-js/faker";
import { HexColorPicker } from "react-colorful";
import classNames from "classnames";

function Paragraph() {
  // State
  const [paragraphs, setParagraphs] = useState([]);
  const [selectedParagraphIndex, setSelectedParagraphIndex] = useState(null);

  // Event handlers
  const handleGenerateParagraph = () => {};

  const handleSelectParagraph = (index) => {};

  const handleFormChange = (event) => {};

  const handleColorChange = (color) => {};

  const handleFormReset = () => {};

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          {/* Paragraphs (left side) */}
          <div className="col-12 col-lg-8 vh-100 max-vh-100 p-4 overflow-y-scroll">
            <h3>Paragraphs</h3>

            <p>Dummy text</p>
          </div>

          {/* Controls (right side) */}
          <div className="col-12 col-lg-4 p-4">
            <h3>Controls</h3>

            <p>You can find the controls for this page below.</p>

            {/* Button for creating a new paragraph */}
            <div className="card mb-3">
              <div className="card-body">
                <h4>Create a new paragraph</h4>
                <p>You can create a new paragraph in this section by clicking the button below.</p>
                <button className="btn btn-primary">Generate random paragraph</button>
              </div>
            </div>

            {/* Form for editing the selected paragraph */}
            <div className="card">
              <div className="card-body">
                <h4>Edit the selected paragraph</h4>
                <p>You can edit the selected paragraph in this section.</p>

                <hr />

                <form className="d-flex flex-column gap-3">
                  <div className="form-group">
                    <label htmlFor="verticalMargin" className="form-label">
                      Vertical margin: 0px
                    </label>
                    <input
                      type="range"
                      className="form-control"
                      id="verticalMargin"
                      name="verticalMargin"
                      placeholder="Vertical margin"
                      min="-100"
                      max="100"
                      step="1"
                      value="0"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="color" className="form-label">
                      Color
                    </label>

                    <input
                      type="text"
                      className="form-control mb-3"
                      id="color"
                      name="color"
                      placeholder="Hex color"
                      value="#000000"
                    />

                    <HexColorPicker />
                  </div>

                  {/* Cancel button */}
                  <div>
                    <button className="btn btn-danger" type="button">
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Paragraph;
