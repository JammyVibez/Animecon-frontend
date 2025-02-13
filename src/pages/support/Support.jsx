import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import "./support.css"

export default function Support() {
    return (
        <>
            <Topbar />
            <div className="support">
                <Sidebar />
                <div className="supportRight">
                    <main className="support-page">
                        <h1 className="page-title">Support Center</h1>
                        <form className="support-form">
                            <label for="issue-type">Select Issue:</label>
                            <select id="issue-type">
                                <option value="login">Login Issue</option>
                                <option value="payment">Payment Issue</option>
                                <option value="report">Report a Bug</option>
                                <option value="other">Other</option>
                            </select>
                            <label for="message">Describe Your Issue:</label>
                            <textarea id="message" rows="5" placeholder="Type your message here..."></textarea>
                            <button type="submit" className="btn submit-btn">Submit</button>
                        </form>
                    </main>

                </div>
            </div>

        </>

    );
}