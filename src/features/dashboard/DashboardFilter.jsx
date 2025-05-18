import Filter from "../../ui/Filter.jsx";
import styled from "styled-components";



const DashFilter=styled.div`
align-items: center;
    justify-content: end;
    display: flex;
`

function DashboardFilter() {

  return (
      <DashFilter>
    <Filter
      filterField='last'
      options={[
        { value: '7', label: 'Last 7 days' },
        { value: '30', label: 'Last 30 days' },
        { value: '90', label: 'Last 90 days' },
      ]}
    />
      </DashFilter>
  );
}

export default DashboardFilter;
