import React, { useState } from 'react';

const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
const COLOR_CLASSES = ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'];

function getColor(count) {
  if (count >= 20) return COLOR_CLASSES[4];
  if (count >= 10) return COLOR_CLASSES[3];
  if (count >= 5) return COLOR_CLASSES[2];
  if (count >= 1) return COLOR_CLASSES[1];
  return COLOR_CLASSES[0];
}

function Cell({ date, count }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        width: 12,
        height: 12,
        backgroundColor: getColor(count),
        borderRadius: 2,
        cursor: 'pointer',
      }}
    >
      {hovered && (
        <div style={{
          position: 'absolute',
          top: -30,
          left: -20,
          backgroundColor: 'black',
          color: 'white',
          padding: '2px 6px',
          fontSize: 10,
          borderRadius: 4,
          whiteSpace: 'nowrap',
          zIndex: 10,
          pointerEvents: 'none'
        }}>
          {`${date}: ${count} activit${count !== 1 ? 'ies' : 'y'}`}
        </div>
      )}
    </div>
  );
}

export default function Activity({ data = [] }) {
  const today = new Date();
  const endDate = new Date(today);
  const startDate = new Date(today);
  startDate.setDate(startDate.getDate() - 7 * 52);

  // рандомізуємо кількість заходів
  const activityMap = data.reduce((acc, dateStr) => {
    const day = dateStr.slice(0, 10);
    const randomCount = Math.floor(Math.random() * 6); // від 0 до 5 заходів на день
    acc[day] = randomCount;
    return acc;
  }, {});

  const days = [];
  const current = new Date(startDate);
  while (current <= endDate) {
    days.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }

  const weeks = [];
  let week = [];
  days.forEach(date => {
    if (date.getDay() === 0 && week.length) {
      weeks.push(week);
      week = [];
    }
    week.push(date);
  });
  if (week.length) weeks.push(week);

  let prevMonth = -1;
  const monthLabels = weeks.map((week) => {
    const firstDay = week[0];
    const month = firstDay.getMonth();
    if (month !== prevMonth) {
      prevMonth = month;
      return MONTH_NAMES[month];
    }
    return '';
  });

  return (
    <div>
      <div style={{ display: 'flex', marginLeft: 10, fontSize: 12, marginBottom: 4 }}>
        {monthLabels.map((label, i) => (
          <div key={i} style={{ width: 14, textAlign: 'center' }}>{label}</div>
        ))}
      </div>

      <div style={{ display: 'flex' }}>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', fontSize: 10, height: 99 }}>
          {DAYS.map((d, i) => (
            <div key={i} style={{ height: 12 * 2 + 4 }}>{d}</div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 2 }}>
          {weeks.map((week, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {[...Array(7)].map((_, j) => {
                const date = week.find(d => d.getDay() === j);
                const dateStr = date?.toISOString().slice(0, 10);
                const count = activityMap[dateStr] || 0;
                return (
                  <Cell key={j} date={dateStr} count={count} />
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', gap: 4, alignItems: 'center', fontSize: 10, marginTop: 10, marginLeft: 25 }}>
        <span>Less</span>
        {COLOR_CLASSES.map((color, i) => (
          <div key={i} style={{
            width: 12,
            height: 12,
            backgroundColor: color,
            borderRadius: 2
          }} />
        ))}
        <span>More</span>
      </div>
    </div>
  );
}
