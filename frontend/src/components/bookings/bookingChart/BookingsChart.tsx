import React from 'react';
import { Bar } from 'react-chartjs-2';

const BOOKINGS_BUCKETS: any = {
    "Cheap": {
        min: 0,
        max: 10
    },
    "Normal":  {
        min: 10,
        max: 50
    },
    "Expensive":  {
        min: 50,
        max: 1000000
    },
}

const data = {
    labels: ['Cheap', 'Normal', 'Expensive'],
    datasets: [
      {
        label: 'My Bookings',
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: [65, 59, 80, 81, 56, 55, 40]
      }
    ]
  };

export const BookingsChart = ({ bookings, onCancel }: any) => {
    const outPut: any = [];
    for(const bucket in BOOKINGS_BUCKETS) {
        const filteredBookings = bookings.reduce((prev: any, current: any) => {
            if(BOOKINGS_BUCKETS[bucket].min <= current.event.price && current.event.price < BOOKINGS_BUCKETS[bucket].max) {
            return prev + 1
            }
            else {
                return prev;
            }
        }, 0);
        outPut[bucket] = filteredBookings;
    }

    const valies = [];
    for (var key in outPut){
        valies.push(outPut[key]);
    }

    console.log(outPut);
    return <Bar
    data={data}
    width={100}
    height={50}
    options={{
      maintainAspectRatio: false
    }}
  />
}
