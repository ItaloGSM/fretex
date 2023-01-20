import React from "react";

const Eye = ({ color }: { color?: string }) => {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.84375 7.5C9.84375 8.1216 9.59682 8.71774 9.15728 9.15728C8.71774 9.59682 8.1216 9.84375 7.5 9.84375C6.8784 9.84375 6.28226 9.59682 5.84272 9.15728C5.40318 8.71774 5.15625 8.1216 5.15625 7.5C5.15625 6.8784 5.40318 6.28226 5.84272 5.84272C6.28226 5.40318 6.8784 5.15625 7.5 5.15625C8.1216 5.15625 8.71774 5.40318 9.15728 5.84272C9.59682 6.28226 9.84375 6.8784 9.84375 7.5Z"
        fill="#BFBFBF"
      />
      <path
        d="M0 7.5C0 7.5 2.8125 2.34375 7.5 2.34375C12.1875 2.34375 15 7.5 15 7.5C15 7.5 12.1875 12.6562 7.5 12.6562C2.8125 12.6562 0 7.5 0 7.5ZM7.5 10.7812C8.37024 10.7812 9.20484 10.4355 9.82019 9.82019C10.4355 9.20484 10.7812 8.37024 10.7812 7.5C10.7812 6.62976 10.4355 5.79516 9.82019 5.17981C9.20484 4.56445 8.37024 4.21875 7.5 4.21875C6.62976 4.21875 5.79516 4.56445 5.17981 5.17981C4.56445 5.79516 4.21875 6.62976 4.21875 7.5C4.21875 8.37024 4.56445 9.20484 5.17981 9.82019C5.79516 10.4355 6.62976 10.7812 7.5 10.7812Z"
        fill="#BFBFBF"
      />
    </svg>
  );
};

export default Eye;
