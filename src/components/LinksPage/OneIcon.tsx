import React from 'react';

interface twoIcInter{
    UTM:boolean,
    Android:boolean,
    IOS:boolean,
}

const OneIcon:React.FC<twoIcInter> = ({UTM,Android,IOS}:twoIcInter) => {
    return (
        <div style={{marginRight:"15px", cursor:"auto"}}>
            { UTM &&
                <div style={{backgroundColor:"#F3F4F6",borderRadius:"9999px",width:"26px",
                    height:"26px",fontSize:"9px",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:"700",color:"black", cursor:"auto" }}>
                    UTM
                </div>
            }
            <div style={{height:"0",width:"0",marginTop:"10px"}}></div>
            {
                IOS &&
                <div>
                    <div style={{backgroundColor:"#F3F4F6",borderRadius:"9999px",width:"26px",
                        height:"26px",fontSize:"10px",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:"600",color:"black", cursor:"auto"}}>
                        IOS
                    </div>
                </div>
            }
            {
                Android &&
                <div>
                    <div style={{backgroundColor:"#F3F4F6",borderRadius:"9999px",width:"26px",
                        height:"26px",fontSize:"10px",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:"600",color:"black", cursor:"auto"}}>
                        <svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.05 4.77502C10.8422 4.77502 10.643 4.85755 10.4961 5.00446C10.3492 5.15136 10.2667 5.35059 10.2667 5.55834V9.10834C10.2667 9.31609 10.3492 9.51534 10.4961 9.66226C10.643 9.80917 10.8422 9.89167 11.05 9.89167C11.2577 9.89167 11.457 9.80917 11.6039 9.66226C11.7508 9.51534 11.8333 9.31609 11.8333 9.10834V5.55834C11.8333 5.35059 11.7508 5.15136 11.6039 5.00446C11.457 4.85755 11.2577 4.77502 11.05 4.77502Z" fill="black" stroke="black" stroke-width="0.00064"/>
                            <path d="M0.95002 4.77502C0.74227 4.77502 0.54302 4.85755 0.39612 5.00446C0.24922 5.15136 0.166687 5.35059 0.166687 5.55834V9.10834C0.166687 9.31609 0.24922 9.51534 0.39612 9.66226C0.54302 9.80917 0.74227 9.89167 0.95002 9.89167C1.15777 9.89167 1.35702 9.80917 1.50392 9.66226C1.65082 9.51534 1.73335 9.31609 1.73335 9.10834V5.55834C1.73335 5.35059 1.65082 5.15136 1.50392 5.00446C1.35702 4.85755 1.15777 4.77502 0.95002 4.77502Z" fill="black" stroke="black" stroke-width="0.00064"/>
                            <path d="M2.30005 4.77502V10.1083C2.30005 10.2254 2.32311 10.3414 2.36792 10.4496C2.41273 10.5578 2.47841 10.6561 2.56121 10.7388C2.64401 10.8217 2.74231 10.8873 2.85049 10.9322C2.95867 10.9769 3.07462 11 3.19172 11H3.75838V12.8917C3.75838 13.0994 3.84091 13.2987 3.98782 13.4456C4.13472 13.5925 4.33397 13.675 4.54172 13.675C4.74947 13.675 4.94872 13.5925 5.09563 13.4456C5.24255 13.2987 5.32505 13.0994 5.32505 12.8917V11H6.67505V12.8917C6.67505 13.0994 6.75755 13.2987 6.90447 13.4456C7.05138 13.5925 7.25063 13.675 7.45838 13.675C7.66613 13.675 7.86538 13.5925 8.0123 13.4456C8.15922 13.2987 8.24172 13.0994 8.24172 12.8917V11H8.80838C9.04488 11 9.27163 10.9061 9.43888 10.7388C9.60613 10.5717 9.70005 10.3448 9.70005 10.1083V4.77502H2.30005Z" fill="black" stroke="black" stroke-width="0.00064"/>
                            <path d="M9.60005 3.66669C9.3548 2.84387 8.81088 2.14242 8.07505 1.70003L7.95005 1.62503L7.81672 1.55836L7.96672 1.30003L8.40838 0.466693C8.41672 0.442952 8.41722 0.417135 8.40972 0.393102C8.40222 0.369077 8.38713 0.348118 8.36672 0.33336H8.30838C8.28713 0.334318 8.2663 0.340052 8.24755 0.350152C8.2288 0.360252 8.21255 0.374452 8.20005 0.391694L7.75005 1.16669L7.60838 1.42503L7.47505 1.36669L7.33338 1.31669C6.4698 1.01698 5.5303 1.01698 4.66672 1.31669L4.53338 1.36669L4.39172 1.42503L4.25005 1.16669L3.80005 0.33336C3.79238 0.319685 3.78211 0.307643 3.76979 0.297943C3.75748 0.288235 3.74338 0.281043 3.72829 0.276793C3.7132 0.272535 3.69742 0.271293 3.68185 0.273135C3.66628 0.274977 3.65122 0.279868 3.63755 0.287527C3.62387 0.295193 3.61183 0.305468 3.60212 0.317785C3.59242 0.330093 3.58523 0.344202 3.58097 0.359285C3.57672 0.374377 3.57547 0.39016 3.57732 0.405727C3.57917 0.421294 3.58405 0.436352 3.59172 0.450027L4.03338 1.28336L4.18338 1.54169L4.05005 1.60836L3.92505 1.68336C3.18569 2.12757 2.64336 2.83679 2.40838 3.66669C2.34334 3.88324 2.30692 4.10737 2.30005 4.33336H9.70005C9.69188 4.10809 9.6583 3.88445 9.60005 3.66669ZM4.33338 3.22503C4.26746 3.22503 4.20301 3.20548 4.14819 3.16885C4.09337 3.13223 4.05065 3.08017 4.02542 3.01926C4.00019 2.95835 3.99359 2.89133 4.00645 2.82667C4.01932 2.762 4.05106 2.70261 4.09767 2.65599C4.1443 2.60938 4.20369 2.57763 4.26835 2.56477C4.33301 2.55191 4.40005 2.55851 4.46097 2.58373C4.52188 2.60897 4.57388 2.65169 4.61055 2.70651C4.64713 2.76133 4.66672 2.82577 4.66672 2.89169C4.66672 2.9801 4.63163 3.06489 4.56905 3.1274C4.50655 3.18991 4.4218 3.22503 4.33338 3.22503ZM7.66672 3.22503C7.6008 3.22503 7.5363 3.20548 7.48155 3.16885C7.42672 3.13223 7.38397 3.08017 7.35872 3.01926C7.33355 2.95835 7.32688 2.89133 7.3398 2.82667C7.35263 2.762 7.38438 2.70261 7.43105 2.65599C7.47763 2.60938 7.53705 2.57763 7.60172 2.56477C7.66638 2.55191 7.73338 2.55851 7.7943 2.58373C7.85522 2.60897 7.90722 2.65169 7.94388 2.70651C7.98047 2.76133 8.00005 2.82577 8.00005 2.89169C8.00005 2.9801 7.96497 3.06489 7.90238 3.1274C7.83988 3.18991 7.75513 3.22503 7.66672 3.22503Z" fill="black" stroke="black" stroke-width="0.00064"/>
                        </svg>

                    </div>
                </div>
            }
        </div>
    );
};

export default OneIcon;
