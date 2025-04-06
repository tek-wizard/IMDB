export const PlayIconSVG = ({ fill = "lightblue" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      width="30"
      height="30"
    >
      <polygon points="30,20 30,80 80,50" fill={fill} />
    </svg>
  )
}

export const ThreeDotsSVG = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="40"
      height="40"
      fill="#000000"
      viewBox="0 0 256 256"
    >
      <path d="M140,128a12,12,0,1,1-12-12A12,12,0,0,1,140,128Zm56-12a12,12,0,1,0,12,12A12,12,0,0,0,196,116ZM60,116a12,12,0,1,0,12,12A12,12,0,0,0,60,116Z"></path>
    </svg>
  )
}

export const StarSVG = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      width="25"
      height="25"
    >
      <rect width="256" height="256" fill="none" />
      <path
        d="M128,189.09l54.72,33.65a8.4,8.4,0,0,0,12.52-9.17l-14.88-62.79,48.7-42A8.46,8.46,0,0,0,224.27,94L160.36,88.8,135.74,29.2a8.36,8.36,0,0,0-15.48,0L95.64,88.8,31.73,94a8.46,8.46,0,0,0-4.79,14.83l48.7,42L60.76,213.57a8.4,8.4,0,0,0,12.52,9.17Z"
        fill="gold"
        stroke="gold"
      />
    </svg>
  )
}

export const HeartSVG = ({ liked }) => {
  return (
    <svg
      baseProfile="tiny"
      height="24px"
      width="24px"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className="inline mr-2"
    >
      <g>
        <path
          d="M12,10.375C12,7.959,10.041,6,7.625,6S3.25,7.959,3.25,10.375c0,1.127,0.159,2.784,1.75,4.375S12,20,12,20 s5.409-3.659,7-5.25s1.75-3.248,1.75-4.375C20.75,7.959,18.791,6,16.375,6S12,7.959,12,10.375Z"
          fill={liked ? "red" : "none"}
          stroke="red"
          stroke-width="2"
        />
      </g>
    </svg>
  )
}

export const BookmarkSVG = ({ bookmarked }) => {
  return (
    <svg
      height="21"
      width="21"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className="inline mr-2 ml-[0.5px]"
    >
      <path
        d="M19 10.132v-6c0-1.103-.897-2-2-2H7c-1.103 0-2 .897-2 2V22l7-4.666L19 22V10.132z"
        fill={bookmarked ? "#007BFF" : "none"}
        stroke="#007BFF"
        stroke-width="2"
      />
    </svg>
  )
}

export const ListSVG = ({ inCollection }) => {
  return (
    <svg
      viewBox="0 0 256 256"
      width="20"
      height="20"
      xmlns="http://www.w3.org/2000/svg"
      className="inline mr-2 ml-[0.5px]"
    >
      <rect fill="none" height="256" width="256" />
      <line
        stroke="#28A745"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
        x1="88"
        x2="216"
        y1="64"
        y2="64"
      />
      <line
        stroke="#28A745"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
        x1="88"
        x2="216"
        y1="128"
        y2="128"
      />
      <line
        stroke="#28A745"
        strokeLinejoin="round"
        strokeLinecap="round"
        strokeWidth="16"
        x1="88"
        x2="216"
        y1="192"
        y2="192"
      />
      <circle
        cx="44"
        cy="64"
        r="12"
        fill={inCollection ? "#28A745" : "none"}
        stroke="#28A745"
        strokeWidth="4"
      />
      <circle
        cx="44"
        cy="128"
        r="12"
        fill={inCollection ? "#28A745" : "none"}
        stroke="#28A745"
        strokeWidth="4"
      />
      <circle
        cx="44"
        cy="192"
        r="12"
        fill={inCollection ? "#28A745" : "none"}
        stroke="#28A745"
        strokeWidth="4"
      />
    </svg>
  )
}

export const ShareSVG = () => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className="inline mr-2 ml-[0.5px]"
    >
      <path
        d="M21.7,10.2l-6.6-6C14.6,3.7,14,4.2,14,5v3c-4.7,0-8.7,2.9-10.6,6.8c-0.7,1.3-1.1,2.7-1.4,4.1c-0.2,1,1.3,1.5,1.9,0.6 C6.1,16,9.8,13.7,14,13.7V17c0,0.8,0.6,1.3,1.1,0.8l6.6-6C22.1,11.4,22.1,10.6,21.7,10.2z"
        fill="none"
        stroke="#6F42C1"
        stroke-width="2"
      />
    </svg>
  )
}

export const PlusSVG = () => {
  return (
    <svg
      width="20px"
      height="20px"
      viewBox="0 0 512 512"
      fill="green"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M417.4,224H288V94.6c0-16.9-14.3-30.6-32-30.6c-17.7,0-32,13.7-32,30.6V224H94.6C77.7,224,64,238.3,64,256  c0,17.7,13.7,32,30.6,32H224v129.4c0,16.9,14.3,30.6,32,30.6c17.7,0,32-13.7,32-30.6V288h129.4c16.9,0,30.6-14.3,30.6-32  C448,238.3,434.3,224,417.4,224z" />
    </svg>
  )
}

export const TickSVG = () => {
  return (
    <svg
      fill="none"
      height="16"
      viewBox="0 0 130 90"
      width="16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M34.7162 81.5027C36.3213 79.9761 37.2031 79.2039 38.0103 78.3599C63.8892 51.3046 92.2309 26.9469 120.74 2.77407C121.817 1.86111 122.921 0.696462 124.196 0.3701C125.733 -0.0238104 128.241 -0.282655 128.928 0.552804C129.852 1.67765 130.015 4.12286 129.452 5.60109C128.782 7.35947 127.15 8.86542 125.669 10.1822C116.833 18.0391 107.749 25.6258 99.0678 33.6462C80.9213 50.4165 62.8904 67.3116 44.9751 84.3312C37.125 91.7736 34.1038 92.075 26.8803 84.1228C22.1253 78.8861 7.77509 61.237 3.38035 55.6767C2.75974 54.8123 2.20692 53.9011 1.72689 52.9513C0.732118 51.1915 0.0876263 49.254 2.05727 47.8895C4.25215 46.3708 5.81043 47.9557 7.11073 49.606C8.42738 51.2769 9.55004 53.1127 10.9598 54.6962C15.336 59.6122 29.9896 76.32 34.7162 81.5027Z"
        fill="black"
      />
    </svg>
  )
}

export const UpArrowSVG = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="black"
    >
      <path d="M11 8.414V18h2V8.414l4.293 4.293 1.414-1.414L12 4.586l-6.707 6.707 1.414 1.414z"></path>
    </svg>
  )
}
