import {type Range} from "../../../types/ranges.ts";

interface RangeProps extends Range{
  name: string
  dimention: string
  onChange: ({min, max}: Range) => void
}

const InputRange = ({name, min, max, dimention, onChange}: RangeProps) => {
  return (
    <>
      <h4 className="wp-block-heading">{name}</h4>
      <div className="facetwp-type-slider">
        <div className="facetwp-slider-wrap">
          <span className="facetwp-slider-label">`${min} ${dimention} — ${max} ${dimention}`</span>
          <div className="facetwp-slider" data-has-moved="">
            <div className="noUi-connects">
              <div className="noUi-connect" style="transform: translate(0%, 0px) scale(1, 1);"></div>
            </div>
            <div className="noUi-origin" style="transform: translate(-100%, 0px); z-index: 5;">
              <div className="noUi-handle noUi-handle-lower"
                   data-handle="0"
                   tabIndex={0}
                   role="slider"
                   aria-orientation="horizontal"
                   aria-valuemin="8.0"
                   aria-valuemax="263.0"
                   aria-valuenow="8.0"
                   aria-valuetext="8.00">
                <div className="noUi-touch-area"></div>
              </div>
            </div>
            <div className="noUi-origin" style="transform: translate(0%, 0px); z-index: 4;">
              <div className="noUi-handle noUi-handle-upper"
                   data-handle="1"
                   tabIndex={0}
                   role="slider"
                   aria-orientation="horizontal"
                   aria-valuemin="8.0"
                   aria-valuemax="263.0"
                   aria-valuenow="263.0"
                   aria-valuetext="263.00">
                <div className="noUi-touch-area"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default InputRange;
