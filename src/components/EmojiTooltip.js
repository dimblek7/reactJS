import React, { useState } from 'react';
import like from "assets/images/like.png";
import sad from "assets/images/sad.png";
import happy from "assets/images/happy.png";
import neutral from "assets/images/neutral.png";
import cx from 'classnames';

export default function EmojiTooltip({sentiment, dataId, getRating}) {
    const [show, setTooltip] = useState(false);
    const sentimentIcon = [happy, neutral, sad];
    const sentimentSrc = sentiment ? sentimentIcon[sentiment - 1] : like;
    return(
        <div onClick={e => e.stopPropagation()} onMouseOver={() => setTooltip(true)} onMouseOut={() => setTooltip(false)}>
            <div className="emoji-section">
                <img src={sentimentSrc} alt="Like" />
            </div>
            <ul className={cx("emoji-icon-container", { 'show': show })} onClick={() => setTooltip(false)}>
                {
                    sentimentIcon.map((icon, key) => (
                        <li key={icon} onClick={() => getRating(dataId, (key + 1).toString())}>
                            <img src={icon} alt="Sentiment" />
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}
