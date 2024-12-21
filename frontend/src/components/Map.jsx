import React from "react";

function Map(){
    return(
        <>
            <div class="container-fluid py-5">
            
                <div class="row">
                <div class="col-lg-12">
                <h2 id="maph">Map</h2>
                    <div class="horizontal-timeline">
                    <ul class="list-inline items">
                        <li class="list-inline-item items-list">
                        <div class="px-4">
                            <div class="event-date badge bg-info">12 Dec</div>
                            <h5 class="pt-2">Location One</h5>
                        </div>
                        </li>
                        <li class="list-inline-item items-list">
                        <div class="px-4">
                            <div class="event-date badge bg-success" >12 Dec</div>
                            <h5 class="pt-2">Location Two</h5>                            
                            <div>
                            
                            </div>
                        </div>
                        </li>
                        <li class="list-inline-item items-list">
                        <div class="px-4">
                            <div class="event-date badge bg-danger">12 Dec</div>
                            <h5 class="pt-2">Location Three</h5>                
                            <div>
                            
                            </div>
                        </div>
                        </li>
                        
                    </ul>

                    </div>

                </div>
                </div>

                </div>
        
        </>
    );
}
export default Map;