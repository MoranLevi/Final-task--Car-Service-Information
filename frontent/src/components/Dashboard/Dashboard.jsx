import React, { useMemo } from 'react';
import ReactTable from '../ReactTable/ReactTable';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Dashboard.css';

const Dashboard = () => {
    
    const tempData = [
        {
            "treatmentNumber": 117,
            "treatmentInformation": 'TestTamir',
            "date": 1,
            "workerEmail": 'TestTamir',
            "carNumber": 1,
            "action": 'TestTamir'
        },
        {
            "treatmentNumber": 117,
            "treatmentInformation": 'TestTamir',
            "date": 1,
            "workerEmail": 'TestTamir',
            "carNumber": 1,
            "action": 'TestTamir'
        },
    ];

    const tableColumns = useMemo(
        () => [
            {
                Header: 'Treatment Number',
                accessor: 'treatmentNumber',
            },
            {
                Header: 'Treatment Informaton',
                accessor: 'treatmentInformation',
            },
            {
                Header: 'Date',
                accessor: 'date',
            },
            {
                Header: 'Worker Email',
                accessor: 'workerEmail',
            },
            {
                Header: 'Car Number',
                accessor: 'carNumber',
            },
            {
                Header: 'Action',
                accessor: 'action',
            }
        ],
        [],
    );

    return (
        <div id="page-top">

            {/* Page Wrapper */}
            <div id="wrapper">

                {/* Content Wrapper */}
                <div id="content-wrapper" className="d-flex flex-column">

                    {/* Main Content */}
                    <div id="content">

                        {/* Topbar */}
                        <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">

                            {/* Topbar Navbar */}
                            <ul className="navbar-nav ml-auto">

                                <div className="topbar-divider d-none d-sm-block"></div>

                                {/* Nav Item - User Information */}
                                <li className="nav-item dropdown no-arrow">
                                    <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button"
                                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <span className="mr-2 d-none d-lg-inline text-gray-600 big">Douglas McGee</span>
                                        <img className="img-profile rounded-circle"
                                            src="../../images/profile-icon.png"/>
                                    </a>
                                    {/* Dropdown - User Information */}
                                    <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                                        aria-labelledby="userDropdown">
                                        <a className="dropdown-item" href="#">
                                            <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                                            Profile
                                        </a>
                                        <a className="dropdown-item" href="#">
                                            <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
                                            Settings
                                        </a>
                                        <a className="dropdown-item" href="#">
                                            <i className="fas fa-list fa-sm fa-fw mr-2 text-gray-400"></i>
                                            Activity Log
                                        </a>
                                        <div className="dropdown-divider"></div>
                                        <a className="dropdown-item" href="#" data-toggle="modal" data-target="#logoutModal">
                                            <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                                            Logout
                                        </a>
                                    </div>
                                </li>
                            </ul>
                        </nav>
                        {/* End of Topbar */}

                        {/* Begin Page Content */}
                        <div className="container-fluid">

                            {/* Page Heading */}
                            <h1 className="h3 mb-2 text-gray-800">Car Service Table</h1>
                            <p className="mb-4">DataTables is a third party plugin that is used to generate the demo table below.
                                For more information about DataTables, please visit the <a target="_blank"
                                    href="https://datatables.net">official DataTables documentation</a>.</p>

                            {/* DataTales Example */}
                            <div className="card shadow mb-4">
                                {/* <div className="card-header py-3">
                                    <h6 className="m-0 font-weight-bold text-primary">DataTables Example</h6>
                                </div> */}
                                <div className="card-body">
                                    <div className="table-responsive">
                                        <table className="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                                            <ReactTable columns={tableColumns} data={tempData} />
                                        </table>
                                    </div>
                                </div>
                            </div>

                        </div>
                        {/* /.container-fluid */}
                    </div>
                    {/* End of Main Content */}

                    {/* Footer */}
                    {/* <footer className="sticky-footer bg-white">
                        <div className="container my-auto">
                            <div className="copyright text-center my-auto">
                                <span>Copyright &copy; Your Website 2020</span>
                            </div>
                        </div>
                    </footer> */}
                    {/* End of Footer */}

                </div>
                {/* End of Content Wrapper */}

            </div>
            {/* End of Page Wrapper */}

            {/* Scroll to Top Button*/}
            <a className="scroll-to-top rounded" href="#page-top">
                <i className="fas fa-angle-up"></i>
            </a>

            {/* Logout Modal*/}
            <div className="modal fade" id="logoutModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
                aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Ready to Leave?</h5>
                            <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">Select "Logout" below if you are ready to end your current session.</div>
                        <div className="modal-footer">
                            <button className="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                            <a className="btn btn-primary" href="login.html">Logout</a>
                        </div>
                    </div>
                </div>
            </div>
    </div>
    );
};

export default Dashboard;