import React from 'react';

class ChartRadian extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      content: {
        label: 'N/A',
        val: null,
        startVal: 0,
        maxVal: 0,
      },
    };
  }

  componentDidMount() {
    this.updateCanvas(150, 150, this.state.content);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.content !== this.state.content) {
      this.setState({ content: nextProps.content });
      this.updateCanvas(150, 150, nextProps.content);
    }
  }

  updateCanvas(width, height, content) {
    const ctx = this.refs.canvas.getContext('2d');
    const centerX = width / 2; // Center x of the meter
    const centerY = height / 2; // Center y of the meter
    const largeHashCount = 60;  // The spacing of large hashes
    const outterRadius = 50;    // How far from the center hashes will start
    const largeHashRadius = 65; // How far from the center hashes will end

    function drawSmallCircle() {
      // Needle Base
      ctx.fillStyle = '#242430';
      ctx.beginPath();
      ctx.arc(centerX, centerY, 45, 0, Math.PI * 2, false);
      ctx.closePath();
      ctx.fill();
      ctx.font = '25pt Calibri';
      ctx.fillStyle = '#b9b6b7';
      const xPos = (content.val > 9) ? ((content.val < 100) ? (content.type === 'temperature' ? 53 : 45) : (content.type === 'temperature' ? 45 : 35)) : (content.type === 'temperature' ? 65 : 55);
      ctx.fillText(content.label, xPos, 85);
    }

    function drawMediumCircle() {
      // Needle Base
      ctx.fillStyle = 'rgba(37, 37, 51, 1)';
      ctx.beginPath();
      ctx.arc(centerX, centerY, 68, 0, Math.PI * 2, false);
      ctx.closePath();
      ctx.fill();
    }

    function drawBigCircle() {
      // Needle Base
      ctx.fillStyle = 'rgba(77, 73, 125, .15)';
      ctx.beginPath();
      ctx.arc(centerX, centerY, 75, 0, Math.PI * 2, false);
      ctx.closePath();
      ctx.fill();
    }

    function drawInnerBorder() {
      // Needle Base
      ctx.fillStyle = 'rgba(77, 73, 125, .15)';
      ctx.beginPath();
      ctx.arc(centerX, centerY, 48, 0, Math.PI * 2, false);
      ctx.closePath();
      ctx.fill();
    }

    function drawOutterBorder() {
      // Needle Base
      ctx.fillStyle = 'rgba(77, 73, 125, .15)';
      ctx.beginPath();
      ctx.arc(centerX, centerY, 69, 0, Math.PI * 2, false);
      ctx.closePath();
      ctx.fill();
    }

    function drawMeter() {
      // Outside border
      // Large Hashes
      ctx.strokeStyle = '#B01000';
      ctx.lineWidth = 1;
      const startPoint = (largeHashCount/4) + 1;
      const maxPoints = largeHashCount;

      function setValuePos(start, max, initPointVal, maxPointVal) {
        const arrayOfPointPos = [];
        let currentPointVal = initPointVal;
        for (let point = start; point <= max; point += 1) {
          arrayOfPointPos[point] = currentPointVal;
          currentPointVal += maxPointVal / largeHashCount;
        }

        for (let point = 0; point < start; point += 1) {
          arrayOfPointPos[point] = currentPointVal;
          currentPointVal += maxPointVal / largeHashCount;
        }

        return arrayOfPointPos;
      }

      const arrayOfPointPos = setValuePos(startPoint, maxPoints, content.startVal, content.maxVal);

      for (let i = 0; i < largeHashesOut.length; i += 1) {
        if (i >= startPoint && i <= 30) {
          const opacity = arrayOfPointPos[i] > content.val ? 0.15 : 1;
          ctx.strokeStyle = `rgba(98, 166, 232, ${opacity})`;
        }

        if (i >= 31 && i <= 45) {
          const opacity = arrayOfPointPos[i] > content.val ? 0.15 : 1;
          ctx.strokeStyle = `rgba(175, 120, 203, ${opacity})`;
        }

        if ((i >= 46 && i <= 60) || i === 0) {
          const opacity = arrayOfPointPos[i] > content.val ? 0.15 : 1;
          ctx.strokeStyle = `rgba(246, 51, 114, ${opacity})`;
        }

        if (i >= 1 && i <= 15) {
          const opacity = arrayOfPointPos[i] > content.val ? 0.15 : 1;
          ctx.strokeStyle = `rgba(255, 56, 56, ${opacity})`;
        }

        ctx.beginPath();
        ctx.moveTo(largeHashesOut[i].x, largeHashesOut[i].y);
        ctx.lineTo(largeHashesIn[i].x, largeHashesIn[i].y);
        ctx.closePath();
        ctx.stroke();
      }
    }

    function getNPointsOnCircle(x, y, radius, n) {
      // Found out the spacing of each point based on n points in 360 degrees
      const hashSpacing = (Math.PI * 2) / n;
      const points = [];

      // For each point of n, find it's position based on the given radius and starting x, y
      for (let i = 0; i < n; i += 1) {
        const a = hashSpacing * i;
        points.push({ x: x + (Math.cos(a) * radius), y: y + (Math.sin(a) * radius) });
      }

      return points;
    }

    // Get the outter points of our large hash lines
    const largeHashesOut = getNPointsOnCircle(centerX, centerY, outterRadius, largeHashCount);
    // Get the inner pints ouf our large hash li
    const largeHashesIn = getNPointsOnCircle(centerX, centerY, largeHashRadius, largeHashCount);

    ctx.clearRect(0, 0, width, height);
    // drawBigCircle();
    drawOutterBorder();
    drawMediumCircle();
    drawInnerBorder();
    drawSmallCircle();
    drawMeter();
  }

  render() {
    return (
      <canvas ref="canvas" width={200} height={200}/>
    );
  }
}

ChartRadian.propTypes = {
  content: React.PropTypes.object,
};

ChartRadian.defaultProps = {
  content: {
    label: 'N/A',
    val: null,
  },
};

export default ChartRadian;
