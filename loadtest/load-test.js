import http from 'k6/http';
import { check } from 'k6';

export const options = {
  vus: 20,
  duration: '30s',

  thresholds: {
    http_req_failed: ['rate<0.01'],
    http_req_duration: ['p(95)<1000'],
  },
};

export default function () {

  const frontend = http.get(
    'http://devops-code-challenge1-alb-560622693.us-east-2.elb.amazonaws.com/'
  );

  check(frontend, {
    'frontend status is 200': (r) => r.status === 200,
  });

  const backend = http.get(
    'http://devops-code-challenge1-alb-560622693.us-east-2.elb.amazonaws.com/api/'
  );

  check(backend, {
    'backend status is 200': (r) => r.status === 200,
  });
}