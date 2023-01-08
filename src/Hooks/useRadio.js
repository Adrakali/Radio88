import React, {useState, useEffect, useContext} from 'react'

function useRadio() {
const [stream, setStream] = useState(null);
const [streamTitle, setStreamTitle] = useState(null);
const [error, setError] = useState(null);
const [loading, setLoading] = useState(false);

  return (
    <div>useRadio</div>
  )
  return {stream, setStream, streamTitle, setStreamTitle, error, setError, loading, setLoading}
}

export default useRadio